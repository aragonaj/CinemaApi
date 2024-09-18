using System;
using System.Collections.Generic;

namespace CinemaApi.Models;

public partial class Music
{
    public int Id { get; set; }

    public string? MusicName { get; set; }

    public string? Born { get; set; }

    public int? Country { get; set; }

    public virtual Country? CountryNavigation { get; set; }

    public virtual ICollection<MovieMusic> MovieMusics { get; set; } = new List<MovieMusic>();
}
