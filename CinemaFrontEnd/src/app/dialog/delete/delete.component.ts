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
import { CountryService } from '../../services/country.service';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    MatDialogActions, 
    MatDialogClose,
    ReactiveFormsModule,
    MatGridListModule,
    // MatFormField,
    // MatLabel,
    MatInputModule,
  ],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent<T> implements OnInit{
  constructor(
    private _dialogRef: MatDialogRef<DeleteComponent<T>>,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _countryService: CountryService,
    private _genericService: GenericService<T>,
    @Inject(MAT_DIALOG_DATA) public dataResponse: {formConfig: any, item: T},
  ){}

  ngOnInit(): void {}

  deleteConfirm(){
    if (this.dataResponse){
      this._dialogRef.close("Delete");
    }// if.end
  }// deleteConfirm.end
}// export class.end
