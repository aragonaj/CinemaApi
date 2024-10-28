// import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import  { Movie } from '../../Interfaces/movie';
import { MovieService } from '../../Services/movie.service';

@Component({
  selector: 'app-movies',
  // standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})

export class MovieComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Title', 'MovieYear', 'RunningTime', 'Actions'];
  dataSource = new MatTableDataSource<Movie>();
  constructor (private _movieService: MovieService){

  }

  ngOnInit(): void {
    this.ListMovies();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator; // para que no de error, se añade el signo de exclamación

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ListMovies(){
    this._movieService.getList().subscribe({
      next:(dataResponse) => {
        console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }
}