using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class Login
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
