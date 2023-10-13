using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Helpers;

namespace MoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class MovieTheatresController : ControllerBase
    {
        private readonly AppDbContext context;
        private readonly IMapper mapper;

        public MovieTheatresController(AppDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("")]
        public async Task<ActionResult<List<MovieTheatreDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.MovieTheatres.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);

            var entities = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();

            return mapper.Map<List<MovieTheatreDTO>>(entities);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<MovieTheatreDTO>> Get(int id)
        {
            var movieTheatre = await context.MovieTheatres.FirstOrDefaultAsync(x => x.Id == id);

            if (movieTheatre == null)
            {
                return NotFound();
            }

            return mapper.Map<MovieTheatreDTO>(movieTheatre);
        }

        [HttpPost]
        public async Task<ActionResult> Post(MovieTheatreCreationDTO movieCreationDTO)
        {
            var movieTheatre = mapper.Map<MovieTheatre>(movieCreationDTO);
            context.MovieTheatres.Add(movieTheatre);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, MovieTheatreCreationDTO movieCreationDTO)
        {
            var movieTheatre = await context.MovieTheatres.FirstOrDefaultAsync(x => x.Id == id);

            if (movieTheatre == null)
            {
                return NotFound();
            }

            movieTheatre = mapper.Map(movieCreationDTO, movieTheatre);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var movieTheatre = await context.MovieTheatres.FirstOrDefaultAsync(x => x.Id == id);

            if (movieTheatre == null)
            {
                return NotFound();
            }

            context.Remove(movieTheatre);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
