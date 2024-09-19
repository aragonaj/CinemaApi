using Microsoft.EntityFrameworkCore;
using CinemaApi.Models;
using CinemaApi.Services.Interfaces;

namespace CinemaApi.Services.Clases
{
    public class MusicService : IMusicService
    {
        private CinemaDbContext _dbContext;
        public MusicService(CinemaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Music>> GetList()
        {
            try
            {
                List<Music> list = new List<Music>();
                list = await _dbContext.Musics.Include(country => country.CountryNavigation).ToListAsync();
                return list;
            }
            catch (Exception ex) {
                throw ex;
            }
        }

        public async Task<Music> Get(int Music)
        {
            try
            {
                Music? found = new Music();
                found = await _dbContext.Musics.Include(country => country.CountryNavigation).Where(music => music.Id == Music).FirstOrDefaultAsync();
                return found;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Music> Add(Music music)
        {
            try
            {
                _dbContext.Musics.Add(music);
                await _dbContext.SaveChangesAsync();
                return music;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Update(Music music)
        {
            try
            {
                _dbContext.Musics.Update(music);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Delete(Music music)
        {
            try
            {
                _dbContext.Musics.Remove(music);
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
