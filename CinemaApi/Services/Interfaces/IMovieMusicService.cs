using CinemaApi.Models;

namespace CinemaApi.Services.Interfaces
{
    public interface IMovieMusicService
    {
        Task<List<MovieMusic>> GetList();
        Task<MovieMusic> Get(int MovieMusic);
        Task<MovieMusic> Add(MovieMusic movieMusic);
        Task<bool> Update(MovieMusic movieMusic);
        Task<bool> Delete(MovieMusic movieMusic);
    }
}
