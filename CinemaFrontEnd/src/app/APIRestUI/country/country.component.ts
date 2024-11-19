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

import { CreateEditComponent } from '../../dialog/create-edit/create-edit.component';

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
  constructor (private _countryService: CountryService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.ListCountries();
  }

  openDialog(){
    this.dialog.open(CreateEditComponent, {
      disableClose: true,
      width: "10rem"
    }).afterClosed().subscribe(result => {
      if (result === "OK"){
        this.ListCountries();
      }
    });
  }

  edit(){

  }

  delete(){
    
  }

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