import { RouterOutlet, Routes } from '@angular/router';
import { authGuard } from './custom/auth.guard';
// views
import { ApiHubComponent } from './views/apiHub/apiHub.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { RegisterComponent } from './views/register/register.component';
// tables
import { CountryComponent } from './APIRestUI/country/country.component';
import { DirectorComponent } from './APIRestUI/director/director.component';
import { MovieDirectorComponent } from './APIRestUI/movieDirector/movieDirector.component';
import { MovieMusicComponent } from './APIRestUI/movieMusic/movieMusic.component';
import { MovieComponent } from './APIRestUI/movie/movie.component';
import { MusicComponent } from './APIRestUI/music/music.component';
import { PageNotFoundComponent } from './views/pageNotFound/pageNotFound.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent, children: [
        { path: 'home', component: HomeComponent } 
     ] },
    { path: 'register', component: RegisterComponent, children: [
       { path: 'home', component: HomeComponent } 
    ] },
    { path: 'apiHub', component: ApiHubComponent, canActivate: [authGuard], children: [
        { path: 'home', component: HomeComponent },
        { path: 'country', component: CountryComponent },
        { path: 'director', component: DirectorComponent },
        { path: 'movieDirector', component: MovieDirectorComponent },
        { path: 'movieMusic', component: MovieMusicComponent },
        { path: 'movie', component: MovieComponent },
        { path: 'music', component: MusicComponent },
    ] },
    { path: '**', component: PageNotFoundComponent }
];
