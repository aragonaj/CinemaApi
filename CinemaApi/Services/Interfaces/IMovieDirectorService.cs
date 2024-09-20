using CinemaApi.Models;

namespace CinemaApi.Services.Interfaces
{
    public interface IMovieDirectorService
    {
        Task<List<MovieDirector>> GetList();
        Task<MovieDirector> Get(int MovieDirector);
        Task<MovieDirector> Add(MovieDirector movieDirector);
        Task<bool> Update(MovieDirector movieDirector);
        Task<bool> Delete(MovieDirector movieDirector);
    }
}
