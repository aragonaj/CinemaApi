using CinemaApi.Custom;
using CinemaApi.DTOs;
using CinemaApi.Models;
using CinemaApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CinemaApi.Services.Clases 
{
    [AllowAnonymous]
    public class ApiUserService(CinemaDbContext cinemaDbContext, JwtUtilities utilities) : IApiUserService
    {
        private readonly CinemaDbContext _cinemaDbContext = cinemaDbContext;
        private readonly JwtUtilities _utilities = utilities;

        public async Task<List<ApiUser>> GetUsers()
        {
            try
            {
                List<ApiUser> list = new List<ApiUser>();
                list = await _cinemaDbContext.Users.ToListAsync();
                return list;
            }

            catch (Exception ex) {
                throw ex;
            }
        }

        [HttpPost]
        [HttpPost("register")]
        public async Task<IActionResult> Register(ApiUserDTO userDto)
        {
            var user = new ApiUser
            {
                UserName = userDto.UserName,
                UserEmail = userDto.UserEmail,
                Password = _utilities.coding(userDto.Password)
            };

            await _cinemaDbContext.Users.AddAsync(user);
            await _cinemaDbContext.SaveChangesAsync();

            if (user.Id != 0)
            {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false, token = "" });
            }
            else return StatusCode(StatusCodes.Status200OK, new { isSuccess = true });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDto)
        {
            var userFound = await _cinemaDbContext.Users.Where(u =>
            u.UserEmail == loginDto.UserEmail &&
            u.Password == _utilities.coding(loginDto.Password)).FirstOrDefaultAsync();

            if (userFound == null)
            {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false, token = "" });
            }
            else return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, token = _utilities.generate(userFound) });
        }

        private IActionResult StatusCode(int status200OK, object value)
        {
            throw new NotImplementedException();
        }
    }
}