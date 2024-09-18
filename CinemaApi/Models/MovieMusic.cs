using System;
using System.Collections.Generic;

namespace CinemaApi.Models;

public partial class MovieMusic
{
    public int Id { get; set; }

    public int? Movie { get; set; }

    public int? Music { get; set; }

    public virtual Movie? MovieNavigation { get; set; }

    public virtual Music? MusicNavigation { get; set; }
}
