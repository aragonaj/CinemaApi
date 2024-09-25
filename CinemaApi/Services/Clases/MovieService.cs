using Microsoft.EntityFrameworkCore;
using CinemaApi.Models;
using CinemaApi.Services.Interfaces;
using System.IO;

namespace CinemaApi.Services.Clases
{
    public class MovieService : IMovieService
    {
        private CinemaDbContext _dbContext;
        public MovieService(CinemaDbContext dbContext) {
            _dbContext = dbContext;
        }

        public async Task<List<Movie>> GetList()
        {
            try
            {
                List<Movie> list = new List<Movie>();
                list = await _dbContext.Movies.ToListAsync();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Movie> Get(int Movie)
        {
            try
            {
                Movie? found = new Movie();
                found = await _dbContext.Movies.Where(movie => movie.Id == Movie).FirstOrDefaultAsync();
                return found;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Movie> Add(Movie movie)
        {
            try
            {
                _dbContext.Movies.Add(movie);
                await _dbContext.SaveChangesAsync();
                return movie;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Update(Movie movie)
        {
            try
            {
                _dbContext.Movies.Update(movie);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Delete(Movie movie)
        {
            try
            {
                _dbContext.Movies.Remove(movie);
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
