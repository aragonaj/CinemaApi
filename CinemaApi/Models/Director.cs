using System;
using System.Collections.Generic;

namespace CinemaApi.Models;

public partial class Director
{
    public int Id { get; set; }

    public string? DirectorName { get; set; }

    public string? Born { get; set; }

    public int? Country { get; set; }

    public virtual Country? CountryNavigation { get; set; }

    public virtual ICollection<MovieDirector> MovieDirectors { get; set; } = new List<MovieDirector>();
}
