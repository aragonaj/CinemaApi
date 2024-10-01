using Microsoft.EntityFrameworkCore;
using CinemaApi.Models;
using CinemaApi.Services.Interfaces;

namespace CinemaApi.Services.Clases
{
    public class CountryService: ICountryService
    {
        private CinemaDbContext _dbContext;
        public CountryService(CinemaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<List<Country>> GetList()
        {
            throw new NotImplementedException();
        }

        public Task<Country> Get(int Country)
        {
            throw new NotImplementedException();
        }

        public Task<Country> Add(Country country)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Country country)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(Country country)
        {
            throw new NotImplementedException();
        }
    }
}
