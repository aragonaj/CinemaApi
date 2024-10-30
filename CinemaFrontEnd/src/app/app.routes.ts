import { RouterOutlet, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountryComponent } from './APIRestUI/country/country.component';
import { DirectorComponent } from './APIRestUI/director/director.component';
import { MovieDirectorComponent } from './APIRestUI/movieDirector/movieDirector.component';
import { MovieMusicComponent } from './APIRestUI/movieMusic/movieMusic.component';
import { MovieComponent } from './APIRestUI/movie/movie.component';
import { MusicComponent } from './APIRestUI/music/music.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'country', component: CountryComponent },
    { path: 'director', component: DirectorComponent },
    { path: 'movieDirector', component: MovieDirectorComponent },
    { path: 'movieMusic', component: MovieMusicComponent },
    { path: 'movie', component: MovieComponent },
    { path: 'music', component: MusicComponent },
];
