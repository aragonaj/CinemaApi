using Microsoft.EntityFrameworkCore;
using CinemaApi.Models;
using CinemaApi.Services.Interfaces;

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
            catch (Exception ex) {
                throw ex;
            }
        }
    }   
}
