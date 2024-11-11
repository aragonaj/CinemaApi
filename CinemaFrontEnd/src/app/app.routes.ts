import { RouterOutlet, Routes } from '@angular/router';
// views
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { RegisterComponent } from './Pages/register/register.component';
// tables
import { CountryComponent } from './APIRestUI/country/country.component';
import { DirectorComponent } from './APIRestUI/director/director.component';
import { MovieDirectorComponent } from './APIRestUI/movieDirector/movieDirector.component';
import { MovieMusicComponent } from './APIRestUI/movieMusic/movieMusic.component';
import { MovieComponent } from './APIRestUI/movie/movie.component';
import { MusicComponent } from './APIRestUI/music/music.component';


export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'country', component: CountryComponent },
    { path: 'director', component: DirectorComponent },
    { path: 'movieDirector', component: MovieDirectorComponent },
    { path: 'movieMusic', component: MovieMusicComponent },
    { path: 'movie', component: MovieComponent },
    { path: 'music', component: MusicComponent },
];
