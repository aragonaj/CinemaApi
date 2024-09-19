using CinemaApi.Models;

namespace CinemaApi.Services.Interfaces
{
    public interface IMovieService
    {
        Task<List<Movie>> GetList();
    }
}
