using System;
using System.Collections.Generic;

namespace CinemaApi.Models;

public partial class MovieDirector
{
    public int Id { get; set; }

    public int? Movie { get; set; }

    public int? Director { get; set; }

    public virtual Director? DirectorNavigation { get; set; }

    public virtual Movie? MovieNavigation { get; set; }
}
