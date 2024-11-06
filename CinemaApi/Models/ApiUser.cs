using System;
using System.Collections.Generic;

namespace CinemaApi.Models;

public partial class ApiUser
{
    public int Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string UserEmail { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;

}