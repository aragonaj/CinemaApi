// import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';

import { MovieMusic } from '../../Interfaces/movieMusic';
import { MovieMusicService } from '../../Services/movie-music.service';

@Component({
  selector: 'app-movieMusic',
  //standalone: true,
  //imports: [RouterOutlet, MatPaginator, MatPaginatorModule, MatTableModule, MatFormField, MatLabel],
  templateUrl: './movieMusic.component.html',
  styleUrl: './movieMusic.component.css'
})

export class MovieMusicComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Title', 'MusicName', 'Actions'];
  dataSource = new MatTableDataSource<MovieMusic>();
  constructor (private _movieMusicService: MovieMusicService){}

  ngOnInit(): void {
    this.ListMovieMusics();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator; // para que no de error, se añade el signo de exclamación

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ListMovieMusics(){
    this._movieMusicService.getList().subscribe({
      next:(dataResponse) => {
        //console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }
}