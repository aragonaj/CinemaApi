using CinemaApi.Models;
using CinemaApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace CinemaApi.Services.Clases
{
    public class MovieMusicService : IMovieMusicService
    {
        private CinemaDbContext _dbContext;
        public MovieMusicService(CinemaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<MovieMusic>> GetList()
        {
            try
            {
                List<MovieMusic> list = new List<MovieMusic>();
                list = await _dbContext.MovieMusics.Include(idMusic => idMusic.MusicNavigation).Include(idMovie => idMovie.MovieNavigation).ToListAsync();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MovieMusic> Get(int MovieMusic)
        {
            try
            {
                MovieMusic? found = new MovieMusic();
                found = await _dbContext.MovieMusics.Include(idMusic => idMusic.MusicNavigation).Include(idMovie => idMovie.MovieNavigation).Where(movieMusic => movieMusic.Id == MovieMusic).FirstOrDefaultAsync();
                return found;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MovieMusic> Add(MovieMusic movieMusic)
        {
            try
            {
                _dbContext.MovieMusics.Add(movieMusic);
                await _dbContext.SaveChangesAsync();
                return movieMusic;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Update(MovieMusic movieMusic)
        {
            try
            {
                _dbContext.MovieMusics.Update(movieMusic);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Delete(MovieMusic movieMusic)
        {
            try
            {
                _dbContext.MovieMusics.Remove(movieMusic);
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
