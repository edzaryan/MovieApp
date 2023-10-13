using MoviesAPI.Entities;

public class MovieTheatersMovies
{
    public int MovieTheatreId { get; set; }
    public int MovieId { get; set; }
    public MovieTheatre MovieTheatre { get; set; }
    public Movie Movie { get; set; }
}
