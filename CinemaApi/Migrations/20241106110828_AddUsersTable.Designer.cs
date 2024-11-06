﻿// <auto-generated />
using System;
using CinemaApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CinemaApi.Migrations
{
    [DbContext(typeof(CinemaDbContext))]
    [Migration("20241106110828_AddUsersTable")]
    partial class AddUsersTable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CinemaApi.Models.ApiUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("UserEmail")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id")
                        .HasName("PK__ApìUser__389F25F609");

                    b.ToTable("ApiUser", (string)null);
                });

            modelBuilder.Entity("CinemaApi.Models.Country", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CountryName")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id")
                        .HasName("PK__Country__3213E83FEB099251");

                    b.ToTable("Country", (string)null);
                });

            modelBuilder.Entity("CinemaApi.Models.Director", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Born")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<int?>("Country")
                        .HasColumnType("int");

                    b.Property<string>("DirectorName")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id")
                        .HasName("PK__Director__3213E83FD686AF27");

                    b.HasIndex("Country");

                    b.ToTable("Director", (string)null);
                });

            modelBuilder.Entity("CinemaApi.Models.Movie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("MovieYear")
                        .HasColumnType("int");

                    b.Property<int?>("RunningTime")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id")
                        .HasName("PK__Movie__3213E83FA7FE69AD");

                    b.ToTable("Movie", (string)null);
                });

            modelBuilder.Entity("CinemaApi.Models.MovieDirector", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("Director")
                        .HasColumnType("int");

                    b.Property<int?>("Movie")
                        .HasColumnType("int");

                    b.HasKey("Id")
                        .HasName("PK__MovieDir__3213E83F45BB5D7F");

                    b.HasIndex("Director");

                    b.HasIndex("Movie");

                    b.ToTable("MovieDirector", (string)null);
                });

            modelBuilder.Entity("CinemaApi.Models.MovieMusic", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("Movie")
                        .HasColumnType("int");

                    b.Property<int?>("Music")
                        .HasColumnType("int");

                    b.HasKey("Id")
                        .HasName("PK__MovieMus__3213E83F0025C639");

                    b.HasIndex("Movie");

                    b.HasIndex("Music");

                    b.ToTable("MovieMusic", (string)null);
                });

            modelBuilder.Entity("CinemaApi.Models.Music", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Born")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<int?>("Country")
                        .HasColumnType("int");

                    b.Property<string>("MusicName")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id")
                        .HasName("PK__Music__3213E83F1F25F609");

                    b.HasIndex("Country");

                    b.ToTable("Music", (string)null);
                });

            modelBuilder.Entity("CinemaApi.Models.Director", b =>
                {
                    b.HasOne("CinemaApi.Models.Country", "CountryNavigation")
                        .WithMany("Directors")
                        .HasForeignKey("Country")
                        .HasConstraintName("FK__Director__Countr__5FB337D6");

                    b.Navigation("CountryNavigation");
                });

            modelBuilder.Entity("CinemaApi.Models.MovieDirector", b =>
                {
                    b.HasOne("CinemaApi.Models.Director", "DirectorNavigation")
                        .WithMany("MovieDirectors")
                        .HasForeignKey("Director")
                        .HasConstraintName("FK__MovieDire__Direc__66603565");

                    b.HasOne("CinemaApi.Models.Movie", "MovieNavigation")
                        .WithMany("MovieDirectors")
                        .HasForeignKey("Movie")
                        .HasConstraintName("FK__MovieDire__Movie__656C112C");

                    b.Navigation("DirectorNavigation");

                    b.Navigation("MovieNavigation");
                });

            modelBuilder.Entity("CinemaApi.Models.MovieMusic", b =>
                {
                    b.HasOne("CinemaApi.Models.Movie", "MovieNavigation")
                        .WithMany("MovieMusics")
                        .HasForeignKey("Movie")
                        .HasConstraintName("FK__MovieMusi__Movie__693CA210");

                    b.HasOne("CinemaApi.Models.Music", "MusicNavigation")
                        .WithMany("MovieMusics")
                        .HasForeignKey("Music")
                        .HasConstraintName("FK__MovieMusi__Music__6A30C649");

                    b.Navigation("MovieNavigation");

                    b.Navigation("MusicNavigation");
                });

            modelBuilder.Entity("CinemaApi.Models.Music", b =>
                {
                    b.HasOne("CinemaApi.Models.Country", "CountryNavigation")
                        .WithMany("Musics")
                        .HasForeignKey("Country")
                        .HasConstraintName("FK__Music__Country__628FA481");

                    b.Navigation("CountryNavigation");
                });

            modelBuilder.Entity("CinemaApi.Models.Country", b =>
                {
                    b.Navigation("Directors");

                    b.Navigation("Musics");
                });

            modelBuilder.Entity("CinemaApi.Models.Director", b =>
                {
                    b.Navigation("MovieDirectors");
                });

            modelBuilder.Entity("CinemaApi.Models.Movie", b =>
                {
                    b.Navigation("MovieDirectors");

                    b.Navigation("MovieMusics");
                });

            modelBuilder.Entity("CinemaApi.Models.Music", b =>
                {
                    b.Navigation("MovieMusics");
                });
#pragma warning restore 612, 618
        }
    }
}
