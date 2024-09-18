using CinemaApi.Models;

namespace CinemaApi.Services.Contract
{
    public interface IMovieService
    {
        Task<List<Movie>> GetList();
    }
}
