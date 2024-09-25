using CinemaApi.Models;

namespace CinemaApi.Services.Interfaces
{
    public interface IMovieService
    {
        Task<List<Movie>> GetList();
        Task<Movie> Get(int Movie);
        Task<Movie> Add(Movie movie);
        Task<bool> Update(Movie movie);
        Task<bool> Delete(Movie movie);
    }
}
