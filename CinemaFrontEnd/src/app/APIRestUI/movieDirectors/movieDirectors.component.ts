// import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MovieDirector } from '../../Interfaces/movieDirector';
import { MovieDirectorService } from '../../Services/movie-director.service';

@Component({
  selector: 'app-movieDirectors',
  // standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './movieDirectors.component.html',
  styleUrl: './movieDirectors.component.css'
})

export class MovieDirectorComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Title', 'DirectorName', 'Actions'];
  dataSource = new MatTableDataSource<MovieDirector>();
  constructor (private _movieDirectorService: MovieDirectorService){}

  ngOnInit(): void {
    this.ListMovieDirectors();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator; // para que no de error, se añade el signo de exclamación

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ListMovieDirectors(){
    this._movieDirectorService.getList().subscribe({
      next:(dataResponse) => {
        console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }
}