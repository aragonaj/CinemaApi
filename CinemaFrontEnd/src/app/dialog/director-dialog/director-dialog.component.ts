import { CommonModule } from '@angular/common';

import { Component, OnInit, Inject } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'


import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Director } from '../../interfaces/director';
import { DirectorService } from '../../services/director.service';

import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-director-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './director-dialog.component.html',
  styleUrl: './director-dialog.component.css'
})

export class DirectorDialogComponent implements OnInit{
  nameAction: string = "New";
  buttonAction: string = "Save";
  formGroup: FormGroup;
  countryList: Country[] = [];

  constructor(
    private _dialogRef: MatDialogRef<DirectorDialogComponent>,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _directorService: DirectorService,
    private _countryService: CountryService,
    @Inject(MAT_DIALOG_DATA) public dataDirector: Director,
  ){
    this.formGroup = this._formBuilder.group({
      directorName: ['', Validators.required],
      born: ['', Validators.required],
      country: ['', Validators.required],
    });

    this._countryService.getList().subscribe({
      next:(data) => {
        this.countryList = data;
      }, 
      error:(e) => {}
    });
  }

  showAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 6000
    });
  }

  saveItem() {

    console.log(this.formGroup.value);

    const model: Director = {
      id: this.dataDirector.id ? this.dataDirector.id : 0,
      directorName: this.formGroup.value.directorName,
      born: this.formGroup.value.born,
      country: this.formGroup.value.country,
    }

    if (this.dataDirector.id == null){
      // crear un nuevo director
      this._directorService.add(model).subscribe({
        next:(data) => {
          this.showAlert("Item created", "OK");
          this._dialogRef.close("ok__added");
        }, 
        error:(e) => {
          this.showAlert("Item not created", "Error");
        }
      });// fin del subscribe
    }// fin del if

    else {
      // actualizar un director
      console.log("Updating director with ID:", this.dataDirector.id);
      console.log("Model:", model);
      this._directorService.update(this.dataDirector.id, model).subscribe({
        next:(data) => {
          this.showAlert("Item updated", "OK");
          this._dialogRef.close("ok__updated");
        }, 
        error:(e) => {
          this.showAlert("Item not updated", "Error");
          console.error("Error updating item:", e);
        }
      });// fin del subscribe
    }// fin del else
  }// fin del saveItem

  // Aquí se inicializan los campos del formulario
  ngOnInit(): void {
    if (this.dataDirector.id) {
      this.formGroup.patchValue({
        directorName: this.dataDirector.directorName,
        born: this.dataDirector.born,
        country: this.dataDirector.country,
      });

      this.nameAction = "Edit";
      this.buttonAction = "Update";
    }
  }
}
