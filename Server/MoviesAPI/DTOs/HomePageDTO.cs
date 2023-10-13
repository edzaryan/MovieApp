namespace MoviesAPI.DTOs
{
    public class HomePageDTO
    { 
        public List<MovieDTO> InTheatres { get; set; }

        public List<MovieDTO> UpcomingReleases { get; set; }
    }
}
