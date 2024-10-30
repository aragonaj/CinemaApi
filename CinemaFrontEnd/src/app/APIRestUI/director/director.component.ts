// import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';

import { Director } from '../../Interfaces/director';
import { DirectorService } from '../../Services/director.service';


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
        //console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }
}