// import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';

import { Music } from '../../interfaces/music';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-music',
  //standalone: true,
  //imports: [RouterOutlet, MatPaginator, MatPaginatorModule, MatTableModule, MatFormField, MatLabel],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})

export class MusicComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['MusicName', 'Born', 'CountryName',  'Actions'];
  dataSource = new MatTableDataSource<Music>();
  constructor (private _musicService: MusicService){}

  ngOnInit(): void {
    this.ListMusics();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator; // para que no de error, se añade el signo de exclamación

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ListMusics(){
    this._musicService.getList().subscribe({
      next:(dataResponse) => {
        console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }
}