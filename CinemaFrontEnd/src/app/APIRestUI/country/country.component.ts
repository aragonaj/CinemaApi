// import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CreateEditComponent } from '../../dialog/create-edit/create-edit.component';
import { DeleteComponent } from '../../dialog/delete/delete.component';

import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';


@Component({
  selector: 'app-country',
  //standalone: true,
  //imports: [RouterOutlet, MatPaginator, MatPaginatorModule, MatTableModule, MatFormField, MatLabel],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})

export class CountryComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['CountryName', 'Actions'];
  dataSource = new MatTableDataSource<Country>();
  constructor (
    private _countryService: CountryService, 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.ListCountries();
  }

  openDialogCreate(){
    this.dialog.open(CreateEditComponent, {
      disableClose: true,
      width: "20rem",
    }).afterClosed().subscribe(result => {
      if (result === "Create"){
        this.ListCountries();
      }
    });
  }

  openDialogEdit(dataResponse: Country){
    this.dialog.open(CreateEditComponent, {
      disableClose: true,
      width: "20rem",
      data: dataResponse,
    }).afterClosed().subscribe(result => {
      if (result === "Edit"){
        this.ListCountries();
      }
    });
  }

  openDialogDelete(dataResponse: Country){
    this.dialog.open(DeleteComponent, {
      disableClose: true,
      data: dataResponse,
    }).afterClosed().subscribe(result => {
      if (result === "Delete"){
        this._countryService.delete(dataResponse.id).subscribe({
          next:(data) => {
            this.showAlert("Register deleted", "OK");
            this.ListCountries();
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

  @ViewChild(MatPaginator) paginator!: MatPaginator; // para que no de error, se añade el signo de exclamación

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ListCountries(){
    this._countryService.getList().subscribe({
      next:(dataResponse) => {
        //console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }
}