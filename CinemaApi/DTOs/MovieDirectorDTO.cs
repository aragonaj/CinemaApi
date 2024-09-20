namespace CinemaApi.DTOs
{
    public class MovieDirectorDTO
    {
        public int Id { get; set; }

        public int? Movie { get; set; }

        public string? Title { get; set; }

        public int? Director { get; set; }

        public string? DirectorName { get; set; }
    }
}
