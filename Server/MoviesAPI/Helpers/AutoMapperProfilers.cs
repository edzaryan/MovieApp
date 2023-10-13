using AutoMapper;
using Microsoft.AspNetCore.Identity;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using NetTopologySuite.Geometries;

namespace MoviesAPI.Helpers
{
    public class AutoMapperProfilers : Profile
    {
        public AutoMapperProfilers(GeometryFactory geometryFactory)
        {
            CreateMap<GenreDTO, Genre>().ReverseMap();
            CreateMap<GenreCreationDTO, Genre>();

            CreateMap<ActorDTO, Actor>().ReverseMap();
            CreateMap<ActorCreationDTO, Actor>()
                .ForMember(x => x.Picture, options => options.Ignore());

            CreateMap<MovieTheatre, MovieTheatreDTO>()
               .ForMember(x => x.Latitude, dto => dto.MapFrom(prop => prop.Location.Y))
               .ForMember(x => x.Longitude, dto => dto.MapFrom(prop => prop.Location.X));

            CreateMap<MovieTheatreCreationDTO, MovieTheatre>()
                .ForMember(x => x.Location, x => x.MapFrom(dto =>
                geometryFactory.CreatePoint(new Coordinate(dto.Longitude, dto.Latitude))));

            CreateMap<MovieCreationDTO, Movie>()
               .ForMember(x => x.Poster, options => options.Ignore())
               .ForMember(x => x.MoviesGenres, options => options.MapFrom(MapMoviesGenres))
               .ForMember(x => x.MovieTheatersMovies, options => options.MapFrom(MapMovieTheatersMovies))
               .ForMember(x => x.MoviesActors, options => options.MapFrom(MapMoviesActors));

            CreateMap<Movie, MovieDTO>()
               .ForMember(x => x.Genres, options => options.MapFrom(MapMoviesGenres))
               .ForMember(x => x.MovieTheatres, options => options.MapFrom(MapMovieTheatersMovies))
               .ForMember(x => x.Actors, options => options.MapFrom(MapMoviesActors));

            CreateMap<IdentityUser, UserDTO>();
        }

        private List<ActorsMovieDTO> MapMoviesActors(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<ActorsMovieDTO>();

            if (movie.MoviesActors != null)
            {
                foreach (var moviesActors in movie.MoviesActors)
                {
                    result.Add(new ActorsMovieDTO()
                    {
                        Id = moviesActors.ActorId,
                        Name = moviesActors.Actor.Name,
                        Character = moviesActors.Character,
                        Picture = moviesActors.Actor.Picture,
                        Order = moviesActors.Order
                    });
                }
            }

            return result;
        }

        private List<MovieTheatreDTO> MapMovieTheatersMovies(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<MovieTheatreDTO>();

            if (movie.MovieTheatersMovies != null)
            {
                foreach (var movieTheaterMovies in movie.MovieTheatersMovies)
                {
                    result.Add(new MovieTheatreDTO()
                    {
                        Id = movieTheaterMovies.MovieTheatreId,
                        Name = movieTheaterMovies.MovieTheatre.Name,
                        Latitude = movieTheaterMovies.MovieTheatre.Location.Y,
                        Longitude = movieTheaterMovies.MovieTheatre.Location.X
                    });
                }
            }

            return result;
        }

        private List<GenreDTO> MapMoviesGenres(Movie movie, MovieDTO moviedto)
        {
            var result = new List<GenreDTO>();

            if (movie.MoviesGenres != null)
            {
                foreach (var genre in movie.MoviesGenres)
                {
                    result.Add(new GenreDTO() { Id = genre.GenreId, Name = genre.Genre.Name });
                }
            }

            return result;
        }

        private List<MoviesGenres> MapMoviesGenres(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MoviesGenres>();

            if (movieCreationDTO.GenresIds == null) { return result; }

            foreach (var id in movieCreationDTO.GenresIds)
            {
                result.Add(new MoviesGenres() { GenreId = id });
            }

            return result;
        }

        private List<MovieTheatersMovies> MapMovieTheatersMovies(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MovieTheatersMovies>();

            if (movieCreationDTO.MovieTheatersIds == null) { return result; }

            foreach (var id in movieCreationDTO.MovieTheatersIds)
            {
                result.Add(new MovieTheatersMovies() { MovieTheatreId = id });
            }

            return result;
        }

        private List<MoviesActors> MapMoviesActors(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MoviesActors>();

            if (movieCreationDTO.Actors == null) { return result; }

            foreach (var actor in movieCreationDTO.Actors)
            {
                result.Add(new MoviesActors() { ActorId = actor.Id, Character = actor.Character });
            }

            return result;
        }
    }
}
