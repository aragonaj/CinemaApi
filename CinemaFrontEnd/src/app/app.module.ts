// imports base
import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule, platformBrowser } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component'; // fue actualizado el archivo app.component.ts

// trabajar con peticiones http
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

// trabajar con tablas
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

// trabajar con controles de formularios
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

// trabajar con alertas
import { MatSnackBarModule } from '@angular/material/snack-bar';

// trabajar con diálogos/modales
import { MatDialogModule } from '@angular/material/dialog'; 

//trabajar con cuadrículas
import { MatGridListModule } from '@angular/material/grid-list';

// instalar ayudas con el formato fecha
// npm install moment --save
// npm install @angular/material-moment-adapter@14.2.7

// trabajar con las tablas de la APIRest
 import { CountryComponent } from './APIRestUI/country/country.component';
 import { DirectorComponent } from './APIRestUI/director/director.component';
 import { MovieComponent } from './APIRestUI/movie/movie.component';
 import { MovieDirectorComponent } from './APIRestUI/movieDirector/movieDirector.component';
 import { MovieMusicComponent } from './APIRestUI/movieMusic/movieMusic.component';
 import { MusicComponent } from './APIRestUI/music/music.component';
// vista Home
import { HomeComponent } from './Pages/home/home.component';
// vista ApiHub
import { ApiHubComponent } from './views/apiHub/apiHub.component';

@NgModule({
  declarations: [
    CountryComponent,
    DirectorComponent,
    MovieComponent,
    MovieDirectorComponent,
    MovieMusicComponent,
    MusicComponent,
  ],
  imports: [
    AppComponent,
    RouterOutlet,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatGridListModule,
    HomeComponent,
    ApiHubComponent,
],
  //providers: [provideHttpClient()],
  //bootstrap: [AppComponent]
})
export class AppModule {}
bootstrapApplication(AppComponent, {providers: [provideHttpClient()]})
