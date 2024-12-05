using AutoMapper;
using CinemaApi.DTOs;
using CinemaApi.Models;
using System.Globalization;

namespace CinemaApi.Utilities
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() {
            //Mapeos
            #region ApiUser
            CreateMap<ApiUser, ApiUserDTO>();
            #endregion
            #region Country
            CreateMap<Country, CountryDTO>().ReverseMap();
            #endregion

            #region Director
            CreateMap<Director, DirectorDTO>()
                .ForMember(destino => 
                    destino.CountryName, 
                    opt => opt.MapFrom(origen => 
                        origen.CountryNavigation.CountryName));

            //CreateMap<DirectorDTO, Director>()
            //    .ForMember(destino =>
            //        destino.CountryNavigation.CountryName,
            //        opt => opt.Ignore());
            #endregion

            #region MovieDirector
            CreateMap<MovieDirector, MovieDirectorDTO>()
                .ForMember(destino =>
                    destino.Title,
                    opt => opt.MapFrom(origen =>
                        origen.MovieNavigation.Title))
                .ForMember(destino =>
                    destino.DirectorName,
                    opt => opt.MapFrom(origen =>
                        origen.DirectorNavigation.DirectorName)
                );

            //CreateMap<MovieDirectorDTO, MovieDirector>()
            //    .ForMember(destino =>
            //        destino.MovieNavigation.Title,
            //        opt => opt.Ignore())
            //    .ForMember(destino =>
            //        destino.DirectorNavigation.DirectorName,
            //        opt => opt.Ignore());
            #endregion

            #region Movie
            CreateMap<Movie, MovieDTO>().ReverseMap();
            #endregion

            #region MovieMusic
            CreateMap<MovieMusic, MovieMusicDTO>()
                .ForMember(destino =>
                    destino.Title,
                    opt => opt.MapFrom(origen =>
                        origen.MovieNavigation.Title))
                .ForMember(destino =>
                    destino.MusicName,
                    opt => opt.MapFrom(origen =>
                        origen.MusicNavigation.MusicName));

            //CreateMap<MovieMusicDTO, MovieMusic>()
            //    .ForMember(destino =>
            //        destino.MovieNavigation.Title,
            //        opt => opt.Ignore())
            //    .ForMember(destino =>
            //        destino.MusicNavigation.MusicName,
            //        opt => opt.Ignore());
            #endregion

            #region Music
            CreateMap<Music, MusicDTO>()
                .ForMember(destino =>
                    destino.CountryName,
                    opt => opt.MapFrom(origen =>
                        origen.CountryNavigation.CountryName));

            //CreateMap<MusicDTO, Music>()
            //    .ForMember(destino =>
            //        destino.CountryNavigation.CountryName,
            //        opt => opt.Ignore());
            #endregion
        }
    }
}
