using CinemaApi.Models;
using CinemaApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CinemaApi.Services.Clases
{
    public class MovieDirectorService : IMovieDirectorService
    {
        private CinemaDbContext _dbContext;
        public MovieDirectorService(CinemaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<MovieDirector>> GetList()
        {
            try
            {
                List<MovieDirector> list = new List<MovieDirector>();
                list = await _dbContext.MovieDirectors.Include(idDirector => idDirector.DirectorNavigation).Include(idMovie => idMovie.MovieNavigation).ToListAsync();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MovieDirector> Get(int MovieDirector)
        {
            try
            {
                MovieDirector? found = new MovieDirector();
                found = await _dbContext.MovieDirectors.Include(idDirector => idDirector.DirectorNavigation).Include(idMovie => idMovie.MovieNavigation).Where(movieDirector => movieDirector.Id == MovieDirector).FirstOrDefaultAsync();
                return found;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MovieDirector> Add(MovieDirector movieDirector)
        {
            try
            {
                _dbContext.MovieDirectors.Add(movieDirector);
                await _dbContext.SaveChangesAsync();
                return movieDirector;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Update(MovieDirector movieDirector)
        {
            try
            {
                _dbContext.MovieDirectors.Update(movieDirector);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Delete(MovieDirector movieDirector)
        {
            try
            {
                _dbContext.MovieDirectors.Remove(movieDirector);
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
