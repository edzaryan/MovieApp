using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MoviesAPI.APIBehavior;
using MoviesAPI.Entities;
using MoviesAPI.Filters;
using MoviesAPI.Helpers;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


var database_connection_string = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddControllers(options =>
{
    options.Filters.Add(typeof(ParseBadRequest));
})
.ConfigureApiBehaviorOptions(BadRequestsBehavior.Parse);

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlServer(
        database_connection_string, 
        sqlOptions => sqlOptions.UseNetTopologySuite()));


builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddSingleton<GeometryFactory>(NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326));
builder.Services.AddScoped<IFileStorageService, InAppStorageService>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton(provider => new MapperConfiguration(config =>
{
    var geometryFactory = provider.GetRequiredService<GeometryFactory>();
    config.AddProfile(new AutoMapperProfilers(geometryFactory));
}).CreateMapper());

var allowedOrigins = "_allowedOrigins";
var clientURL = builder.Configuration["Client_url"];

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("IsAdmin", policy => policy.RequireClaim("role", "admin"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowedOrigins,
            policy => 
            {
                policy.WithOrigins(clientURL);
                policy.AllowAnyHeader();
                policy.AllowAnyMethod();
                policy.WithExposedHeaders(new string[] { "totalAmountOfRecords" });
            });
});

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(options =>
               {
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuer = false,
                       ValidateAudience = false,
                       ValidateLifetime = true,
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = new SymmetricSecurityKey(
                           Encoding.UTF8.GetBytes(builder.Configuration["keyjwt"])),
                       ClockSkew = TimeSpan.Zero
                   };
               });


var app = builder.Build();


app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseCors(allowedOrigins);

app.UseAuthorization();

app.MapControllers();


app.Run();
