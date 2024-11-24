import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogActions, MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-create-edit',
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
  templateUrl: './create-edit.component.html',
  styleUrl: './create-edit.component.css'
})
export class CreateEditComponent<T> implements OnInit {
  nameAction: string = "Create";
  buttonAction: string = "Save";
  form: FormGroup;
  itemList: T[] = [];

  constructor(
    private _dialogRef: MatDialogRef<CreateEditComponent<T>>,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _genericService: GenericService<T>,
    @Inject(MAT_DIALOG_DATA) public data: { formConfig: any, item: T }
  ) {
    this.form = this._formBuilder.group(data.formConfig);

    this._genericService.getList().subscribe({
      next: (data) => {
        this.itemList = data;
      },
      error: (e) => { }
    });
  }

  showAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 6000
    });
  }

  createEditItem() {
    const model = this.form.value;

    if (this.data.item == null) {
      this._genericService.add(model).subscribe({
        next: (data) => {
          this.showAlert("Item added", "OK");
          this._dialogRef.close("New added");
        },
        error: (e) => {
          this.showAlert("Item not added", "Failed");
        }
      });
    } else {
      this._genericService.update((this.data.item as any).id, model).subscribe({
        next: (data) => {
          this.showAlert("Item updated", "OK");
          this._dialogRef.close("Updated");
        },
        error: (e) => {
          this.showAlert("Item not updated", "Failed");
        }
      });
    }
  }

  ngOnInit(): void {
    if (this.data.item) {
      this.form.patchValue(this.data.item);
      this.nameAction = "Edit";
      this.buttonAction = "Update";
    }
  }
}
