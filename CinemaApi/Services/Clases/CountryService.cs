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

        public async Task<List<Country>> GetList()
        {
            try
            {
                List<Country> list = new List<Country>();
                list = await _dbContext.Countries.ToListAsync();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Country> Get(int Country)
        {
            try
            {
                Country? found = new Country();
                found = await _dbContext.Countries.Where(country => country.Id == Country).FirstOrDefaultAsync();
                return found;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Country> Add(Country country)
        {
            try
            {
                _dbContext.Countries.Add(country);
                await _dbContext.SaveChangesAsync();
                return country;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Update(Country country)
        {
            try
            {
                _dbContext.Countries.Update(country);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Delete(Country country)
        {
            try
            {
                _dbContext.Countries.Remove(country);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
