using CinemaApi.Services.Interfaces;
using CinemaApi.Models;
using CinemaApi.DTOs;
using CinemaApi.Custom;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;

// fuente: https://www.youtube.com/watch?v=i3trcykG7bU

namespace CinemaApi.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly CinemaDbContext _cinemaDbContext;
        private readonly JwtUtilities _utilities;
        public AuthController(CinemaDbContext cinemaDbContext, JwtUtilities utilities)
        {
            _cinemaDbContext = cinemaDbContext;
            _utilities = utilities;
        }

        [HttpGet("List")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _cinemaDbContext.Users.ToListAsync();
            return Ok(users);
        }

        [HttpPost]
        [Route("register")]
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
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true });
            }
            else return StatusCode(StatusCodes.Status200OK, new { isSuccess = false });
        }

        [HttpPost]
        [Route("login")]
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

        [HttpGet]
        [Route("validate")]
        public IActionResult validate([FromQuery]string token)
        {
            bool response = _utilities.validate(token);
             return StatusCode(StatusCodes.Status200OK, new { isSuccess = response });
        }
    }
}
