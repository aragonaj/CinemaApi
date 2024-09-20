namespace CinemaApi.DTOs
{
    public class MovieMusicDTO
    {
        public int Id { get; set; }

        public int? Movie { get; set; }

        public string? Title { get; set; }

        public int? Music { get; set; }

        public string? MusicName { get; set; }
    }
}
