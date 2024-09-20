namespace CinemaApi.DTOs
{
    public class MovieDTO
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public int? MovieYear { get; set; }

        public int? RunningTime { get; set; }
    }
}
