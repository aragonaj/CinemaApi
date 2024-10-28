// imports base
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { CountryComponent } from './APIRestUI/countries/countries.component';
import { DirectorComponent } from './APIRestUI/directors/directors.component';
import { MovieDirectorComponent } from './APIRestUI/movieDirectors/movieDirectors.component';
import { MovieMusicComponent } from './APIRestUI/movieMusic/movieMusics.component';
import { MovieComponent } from './APIRestUI/movies/movies.component';
import { MusicComponent } from './APIRestUI/musics/musics.component';


@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    DirectorComponent,
    MovieDirectorComponent,
    MovieMusicComponent,
    MovieComponent,
    MusicComponent,
  ],
  imports: [
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
    MatGridListModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule {}