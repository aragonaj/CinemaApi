using CinemaApi.Models;

namespace CinemaApi.Services.Interfaces
{
    public interface IMusicService
    {
        Task<List<Music>> GetList();
        Task<Music> Get(int Music);
        Task<Music> Add(Music music);
        Task<bool> Update(Music music);
        Task<bool> Delete(Music music);
    }
}
