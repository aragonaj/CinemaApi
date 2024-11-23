// import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

import { CreateEditComponent } from '../../dialog/create-edit/create-edit.component';
import { DeleteComponent } from '../../dialog/delete/delete.component';

import { Director } from '../../interfaces/director';
import { DirectorService } from '../../services/director.service';

@Component({
  selector: 'app-director',
  //standalone: true,
  //imports: [RouterOutlet, MatPaginator, MatPaginatorModule, MatTableModule, MatFormField, MatLabel],
  templateUrl: './director.component.html',
  styleUrl: './director.component.css'
})

export class DirectorComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['DirectorName', 'Born', 'CountryName', 'Actions'];
  dataSource = new MatTableDataSource<Director>();
  constructor (
    private _directorService: DirectorService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.ListDirectors();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator; // para que no de error, se añade el signo de exclamación

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialogCreate(){
    this.dialog.open(CreateEditComponent, {
      disableClose: true,
      width: "20rem",
    }).afterClosed().subscribe(result => {
      if (result === "Create"){
        this.ListDirectors();
      }
    });
  }

  openDialogEdit(dataResponse: Director){
    this.dialog.open(CreateEditComponent, {
      disableClose: true,
      width: "20rem",
      data: dataResponse,
    }).afterClosed().subscribe(result => {
      if (result === "Edit"){
        this.ListDirectors();
      }
    });
  }

  openDialogDelete(dataResponse: Director){
    this.dialog.open(DeleteComponent, {
      disableClose: true,
      data: dataResponse,
    }).afterClosed().subscribe(result => {
      if (result === "Delete"){
        this._directorService.delete(dataResponse.id).subscribe({
          next:(data) => {
            this.showAlert("Register deleted", "OK");
            this.ListDirectors();
          }, error:(e) => {}
        });
      }
    });
  }

  showAlert(message:string, action:string){
    this._snackBar.open(message, action,{
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 60000
    });
  }// showAlert.end

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ListDirectors(){
    this._directorService.getList().subscribe({
      next:(dataResponse) => {
        //console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }
}