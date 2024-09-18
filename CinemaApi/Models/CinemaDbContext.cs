using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CinemaApi.Models;

public partial class CinemaDbContext : DbContext
{
    public CinemaDbContext()
    {
    }

    public CinemaDbContext(DbContextOptions<CinemaDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<Director> Directors { get; set; }

    public virtual DbSet<Movie> Movies { get; set; }

    public virtual DbSet<MovieDirector> MovieDirectors { get; set; }

    public virtual DbSet<MovieMusic> MovieMusics { get; set; }

    public virtual DbSet<Music> Musics { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Country>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Country__3213E83FEB099251");

            entity.ToTable("Country");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CountryName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Director>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Director__3213E83FD686AF27");

            entity.ToTable("Director");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Born)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.DirectorName)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.CountryNavigation).WithMany(p => p.Directors)
                .HasForeignKey(d => d.Country)
                .HasConstraintName("FK__Director__Countr__5FB337D6");
        });

        modelBuilder.Entity<Movie>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Movie__3213E83FA7FE69AD");

            entity.ToTable("Movie");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Title)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<MovieDirector>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MovieDir__3213E83F45BB5D7F");

            entity.ToTable("MovieDirector");

            entity.Property(e => e.Id).HasColumnName("id");

            entity.HasOne(d => d.DirectorNavigation).WithMany(p => p.MovieDirectors)
                .HasForeignKey(d => d.Director)
                .HasConstraintName("FK__MovieDire__Direc__66603565");

            entity.HasOne(d => d.MovieNavigation).WithMany(p => p.MovieDirectors)
                .HasForeignKey(d => d.Movie)
                .HasConstraintName("FK__MovieDire__Movie__656C112C");
        });

        modelBuilder.Entity<MovieMusic>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MovieMus__3213E83F0025C639");

            entity.ToTable("MovieMusic");

            entity.Property(e => e.Id).HasColumnName("id");

            entity.HasOne(d => d.MovieNavigation).WithMany(p => p.MovieMusics)
                .HasForeignKey(d => d.Movie)
                .HasConstraintName("FK__MovieMusi__Movie__693CA210");

            entity.HasOne(d => d.MusicNavigation).WithMany(p => p.MovieMusics)
                .HasForeignKey(d => d.Music)
                .HasConstraintName("FK__MovieMusi__Music__6A30C649");
        });

        modelBuilder.Entity<Music>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Music__3213E83F1F25F609");

            entity.ToTable("Music");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Born)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.MusicName)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.CountryNavigation).WithMany(p => p.Musics)
                .HasForeignKey(d => d.Country)
                .HasConstraintName("FK__Music__Country__628FA481");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
