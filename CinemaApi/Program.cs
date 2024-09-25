using CinemaApi.Models;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;
using System;
using CinemaApi.Services.Interfaces;
using CinemaApi.Services.Clases;
using AutoMapper;
using CinemaApi.DTOs;
using CinemaApi.Utilities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CinemaDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Connection"));
});

builder.Services.AddScoped<IMusicService, MusicService>();
builder.Services.AddScoped<IDirectorService, DirectorService>();
builder.Services.AddScoped<IMovieService, MovieService>();
builder.Services.AddScoped<IMovieDirectorService, MovieDirectorService>();
builder.Services.AddScoped<IMovieMusicService, MovieMusicService>();

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

#region PETICIONES
// Mostrar listas de: películas, directores y compositores
app.MapGet("/movie/list", async (IMovieService _movieService, IMapper _mapper) =>
{
    var movieList = await _movieService.GetList();
    var movieListDTO = _mapper.Map<List<MovieDTO>>(movieList);
    if (movieListDTO.Count > 0)
    {
        return Results.Ok(movieListDTO);
    }
    else { 
        return Results.NotFound("No se encontró ninguna película");
    }
});

app.MapGet("/director/list", async (IDirectorService _directorService, IMapper _mapper) =>
{
    var directorList = await _directorService.GetList();
    var directorListDTO = _mapper.Map<List<DirectorDTO>>(directorList);
    if (directorListDTO.Count > 0)
    {
        return Results.Ok(directorListDTO);
    }
    else
    {
        return Results.NotFound("No se encontró ningún/a director/a de cine");
    }
});

app.MapGet("/music/list", async (IMusicService _musicService, IMapper _mapper) =>
{
    var musicList = await _musicService.GetList();
    var musicListDTO = _mapper.Map<List<MusicDTO>>(musicList);
    if (musicListDTO.Count > 0)
    {
        return Results.Ok(musicListDTO);
    }
    else
    {
        return Results.NotFound("No se encontró ningún/a compositor/a");
    }
});

// Agregar a las listas: películas, directores y compositores
//app.MapPost("/movie/save", async () => { });
app.MapPost("/movie/save", async (Movie model, IMovieService _movieService, IMapper _mapper) => {
    var _movie = _mapper.Map<Movie>(model);
    var _newMovie = await _movieService.Add(_movie);

    if (_newMovie.Id != 0)
    {
        return Results.Ok(_mapper.Map<MovieDTO>(_newMovie));
    }
    else
    {
        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    }
});

app.MapPost("/director/save", async (Director model,  IDirectorService _directorService, IMapper _mapper) => {
    var _director = _mapper.Map<Director>(model);
    var _newDirector = await _directorService.Add(_director);

    if (_newDirector.Id != 0) {
        return Results.Ok(_mapper.Map<DirectorDTO>(_newDirector));
    } 
    else
    {
        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    }
});

app.MapPost("/music/save", async(Music model, IMusicService _musicService, IMapper _mapper) => {
    var _music = _mapper.Map<Music>(model);
    var _newMusic = await _musicService.Add(_music);

    if (_newMusic.Id != 0)
    {
        return Results.Ok(_mapper.Map<MusicDTO>(_newMusic));
    }
    else
    {
        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    }
});

// Actualizar en las listas: una película, un director o un compositor
app.MapPut("/movie/update/{id}", async (int id, MovieDTO model, IMovieService _movieService, IMapper _mapper) =>
{
    var _found = await _movieService.Get(id);
    if (_found is null)
    {
        return Results.NotFound();
    }

    var _movie = _mapper.Map<Movie>(model);

    _found.Title = _movie.Title;
    _found.MovieYear = _movie.MovieYear;
    _found.RunningTime = _movie.RunningTime;

    var respuesta = await _movieService.Update(_found);

    if (respuesta)
    {
        return Results.Ok(_mapper.Map<MovieDTO>(_found));
    }
    else
    {
        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    }
});
app.MapPut("/director/update/{id}", async (int id, DirectorDTO model, IDirectorService _directorService, IMapper _mapper) => {
    var _found = await _directorService.Get(id);
    if (_found is null)
    {
        return Results.NotFound();
    }

    var _director = _mapper.Map<Director>(model);

    _found.DirectorName = _director.DirectorName;
    _found.Born = _director.Born;
    //_found.Country = _director.Country;
    _found.CountryNavigation = _director.CountryNavigation;

    var respuesta = await _directorService.Update(_found);

    if (respuesta)
    {
        return Results.Ok(_mapper.Map<DirectorDTO>(_found));
    }
    else
    {
        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    }
});
app.MapPut("/music/update/{id}", async (int id, MusicDTO model, IMusicService _musicService, IMapper _mapper) => {
    var _found = await _musicService.Get(id);
    if (_found is null)
    {
        return Results.NotFound();
    }

    var _music = _mapper.Map<Music>(model);

    _found.MusicName = _music.MusicName;
    _found.Born = _music.Born;
    //_found.Country = _music.Country;
    _found.CountryNavigation = _music.CountryNavigation;

    var respuesta = await _musicService.Update(_found);

    if (respuesta)
    {
        return Results.Ok(_mapper.Map<MusicDTO>(_found));
    }
    else
    {
        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    }
});

// Eliminar en las listas: una película, un director o un compositor
app.MapDelete("/movie/delete/{id}", async (int id, IMovieService _movieService) => {
    var _found = await _movieService.Get(id);
    if (_found is null)
    {
        return Results.NotFound();
    }

    var respuesta = await _movieService.Delete(_found);
    if (respuesta)
    {
        return Results.Ok();
    }
    else
    {
        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    }
});
app.MapDelete("/director/delete/{id}", async (int id, IDirectorService _directorService) => {
    var _found = await _directorService.Get(id);
    if (_found is null)
    {
        return Results.NotFound();
    }

    var respuesta = await _directorService.Delete(_found);
    if (respuesta)
    {
        return Results.Ok();
    }
    else
    {
        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    }
});
app.MapDelete("/music/delete/{id}", async (int id, IMusicService _musicService) => {
    var _found = await _musicService.Get(id);
    if (_found is null)
    {
        return Results.NotFound();
    }

    var respuesta = await _musicService.Delete(_found);
    if (respuesta)
    {
        return Results.Ok();
    }
    else
    {
        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    }
});
#endregion
app.Run();

