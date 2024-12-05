using System;
using System.Collections.Generic;

namespace CinemaApi.Models;

public partial class Country
{
    public int Id { get; set; }

    public string? CountryName { get; set; }

    //public virtual ICollection<Director> Directors { get; set; } = new List<Director>();

    //public virtual ICollection<Music> Musics { get; set; } = new List<Music>();
}
