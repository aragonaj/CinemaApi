using System;
using System.Collections.Generic;

namespace CinemaApi.Models;

public partial class Movie
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public int? MovieYear { get; set; }

    public int? RunningTime { get; set; }

    public virtual ICollection<MovieDirector> MovieDirectors { get; set; } = new List<MovieDirector>();

    public virtual ICollection<MovieMusic> MovieMusics { get; set; } = new List<MovieMusic>();
}
