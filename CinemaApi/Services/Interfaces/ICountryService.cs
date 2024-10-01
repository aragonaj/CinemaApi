using CinemaApi.Models;

namespace CinemaApi.Services.Interfaces
{
    public interface ICountryService
    {
        Task<List<Country>> GetList();
        Task<Country> Get(int Country);
        Task<Country> Add(Country country);
        Task<bool> Update(Country country);
        Task<bool> Delete(Country country);
    }
}
