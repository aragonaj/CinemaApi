using CinemaApi.Models;

namespace CinemaApi.Services.Interfaces
{
    public interface IDirectorService
    {
        Task<List<Director>> GetList();
        Task<Director> Get(int Director);
        Task<Director> Add(Director director);
        Task<bool> Update(Director director);
        Task<bool> Delete(Director director);
    }
}
