﻿namespace CinemaApi.DTOs
{
    public class ApiUserDTO
    {
        public int Id { get; set; }

        public string UserName { get; set; } = string.Empty;

        public string UserEmail { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
    }
}