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
#endregion
app.Run();

