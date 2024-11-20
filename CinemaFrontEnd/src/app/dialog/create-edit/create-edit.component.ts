import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogActions, MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Country } from '../../interfaces/country';
// import { Director } from '../../interfaces/director';
// import { Movie } from '../../interfaces/movie';
// import { MovieDirector } from '../../interfaces/movieDirector';
// import { MovieMusic } from '../../interfaces/movieMusic';
// import { Music } from '../../interfaces/music';
import { CountryService } from '../../services/country.service';
// import { DirectorService } from '../../services/director.service';
// import { MovieService } from '../../services/movie.service';
// import { MovieDirectorService } from '../../services/movie-director.service';
// import { MovieMusicService } from '../../services/movie-music.service';
// import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-create-edit',
  standalone: true,
  imports: [
    MatDialogActions, 
    MatDialogClose,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormField,
    MatLabel,
    MatInputModule,
  ],
  templateUrl: './create-edit.component.html',
  styleUrl: './create-edit.component.css'
})
export class CreateEditComponent implements OnInit {
  nameAction: string = "Create";
  buttonAction: string = "Save";
  
  countryForm: FormGroup;
  countryList: Country[] = [];

  constructor(
    private _dialogRef: MatDialogRef<CreateEditComponent>,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _countryService: CountryService,
    @Inject(MAT_DIALOG_DATA) public dataResponse: Country,
    // private _directorService: DirectorService,
    // private _movieService: MovieService,
    // private _movieDirectorService: MovieDirectorService,
    // private _movieMusicService: MovieMusicService,
    // private _musicService: MusicService,
  ){
    this.countryForm = this._formBuilder.group({
      countryName: ['',Validators.required]
    });

    this._countryService.getList().subscribe({
      next:(data) => {
        this.countryList = data;
      }, error:(e) => {}
    });
  }// constructor.end

  showAlert(message:string, action:string){
    this._snackBar.open(message, action,{
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 60000
    });
  }

  createEditCountry(){
    const model: Country = {
      id: 0,
      countryName: this.countryForm.value.countryName
    }

    if (this.dataResponse == null){
      this._countryService.add(model).subscribe({
        next:(data) => {
          this.showAlert("New country added", "Create");
          this._dialogRef.close("New added");
        }, error:(e) => {
          this.showAlert("New register does not added", "Failed");
        }// error.end
      });
    }// if.end
    else {
      this._countryService.update(this.dataResponse.id, model).subscribe({
        next:(data) => {
          this.showAlert("Country updated", "Edit");
          this._dialogRef.close("Register updated");
        }, error:(e) => {
          this.showAlert("Register does not updated", "Failed");
        }// error.end
      });
    }
  }// createEditCountry.end

  ngOnInit(): void {
    if (this.dataResponse){
      this.countryForm.patchValue({
        countryName: this.dataResponse.countryName
      });

      this.nameAction = "Edit";
      this.buttonAction = "Update";
    }// if.end
  }// ngOnInit.end
}
