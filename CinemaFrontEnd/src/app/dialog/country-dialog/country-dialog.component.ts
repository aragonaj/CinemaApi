import { CommonModule } from '@angular/common';

import { Component, OnInit, Inject } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { MatGridListModule } from '@angular/material/grid-list';

import { MatFormField, MatLabel } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { Country } from '../../interfaces/country';

import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-dialog',
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
  ],
  templateUrl: './country-dialog.component.html',
  styleUrl: './country-dialog.component.css'
})

// https://www.youtube.com/watch?v=7USizyX1tAQ

export class CountryDialogComponent implements OnInit{
  nameAction: string = "New";
  buttonAction: string = "Save";
  formGroup: FormGroup;
  countryList: Country[] = [];

  constructor(
    private _dialogRef: MatDialogRef<CountryDialogComponent>,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _countryService: CountryService,
    @Inject(MAT_DIALOG_DATA) public dataCountry: Country,
  ){
    this.formGroup = this._formBuilder.group({
      countryName: ['', Validators.required],
    });

    this._countryService.getList().subscribe({
      next:(data) => {
        this.countryList = data;
      }, error:(e) => {}
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
    // console.log("ID" + this.dataCountry.id)

    const model: Country = {
      id: 0,
      countryName: this.formGroup.value.countryName,
    }

    if(this.dataCountry.id == null){
      this._countryService.add(model).subscribe({
        next:(data) => {
          this.showAlert("Item created", "OK");
          this._dialogRef.close("ok__added");
        }, error:(e) => {
          this.showAlert("Item not created", "Error");
        }
      });
    }

    else {
      this._countryService.update(this.dataCountry.id, model).subscribe({
        next:(data) => {
          this.showAlert("Item updated", "OK");
          this._dialogRef.close("ok__updated");
        }, error:(e) => {
          this.showAlert("Item not updated", "Error");
        }
      });
    }
  }

  ngOnInit(): void {
    if (this.dataCountry.id) {
      this.formGroup.patchValue({
        countryName: this.dataCountry.countryName,
      });

      this.nameAction = "Edit";
      this.buttonAction = "Update";
    }
  }
}
