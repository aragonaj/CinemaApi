// import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Country } from '../../Interfaces/country';
import { CountryService } from '../../Services/country.service';

@Component({
  selector: 'app-countries',
  // standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})

export class CountryComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['CountryName', 'Actions'];
  dataSource = new MatTableDataSource<Country>();
  constructor (private _countryService: CountryService){}

  ngOnInit(): void {
    this.ListCountries();
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
        console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }
}