// import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Director } from '../../Interfaces/director';
import { DirectorService } from '../../Services/director.service';
import { Country } from '../../Interfaces/country';
import { CountryService } from '../../Services/country.service';

@Component({
  selector: 'app-directors',
  // standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './directors.component.html',
  styleUrl: './directors.component.css'
})

export class DirectorComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['DirectorName', 'Born', 'CountryName', 'Actions'];
  dataSource = new MatTableDataSource<Director>();
  constructor (private _directorService: DirectorService){}

  ngOnInit(): void {
    this.ListDirectors();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator; // para que no de error, se añade el signo de exclamación

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ListDirectors(){
    this._directorService.getList().subscribe({
      next:(dataResponse) => {
        console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }
}