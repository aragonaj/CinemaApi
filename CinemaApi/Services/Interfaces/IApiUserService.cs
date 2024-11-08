using CinemaApi.DTOs;
using CinemaApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaApi.Services.Interfaces
{
    public interface IApiUserService
    {
        Task<List<ApiUser>> GetUsers();
        Task<IActionResult> Register(ApiUserDTO userDto);
        Task<IActionResult> Login(LoginDTO loginDto);
    }
}
