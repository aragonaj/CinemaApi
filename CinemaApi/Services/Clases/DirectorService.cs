using Microsoft.EntityFrameworkCore;
using CinemaApi.Models;
using CinemaApi.Services.Interfaces;

namespace CinemaApi.Services.Clases
{
    public class DirectorService : IDirectorService
    {
        private CinemaDbContext _dbContext;
        public DirectorService(CinemaDbContext dbContext) {
            _dbContext = dbContext;
        }

        public async Task<List<Director>> GetList()
        {
            try
            {
                var countryList = _dbContext.Countries.ToList();
                List<Director> list = new List<Director>();
                
                list = await _dbContext.Directors
                    .Include(country => country.CountryNavigation)
                    .ToListAsync();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Director> Get(int Director)
        {
            try
            {
                Director? found = new Director();
                found = await _dbContext.Directors
                    .Include(country => country.CountryNavigation)
                    .Where(director => director.Id == Director)
                    .FirstOrDefaultAsync();
                return found;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Director> Add(Director director)
        {
            try
            {
                _dbContext.Directors.Add(director);
                await _dbContext.SaveChangesAsync();
                return director;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Update(Director director)
        {
            try
            {
                _dbContext.Directors.Update(director);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Delete(Director director)
        {
            try
            {
                _dbContext.Directors.Remove(director);
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
