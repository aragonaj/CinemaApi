import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Validators } from '@angular/forms';

import { DeleteComponent } from '../../dialog/delete/delete.component';
import { MovieMusic } from '../../interfaces/movieMusic';
import { MovieMusicService } from '../../services/movie-music.service';

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

  constructor (
    private _movieMusicService: MovieMusicService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.ListMovieMusics();
  }

  openDialogCreate(){
    // this.dialog.open(CreateEditComponent, {
    //   disableClose: true,
    //   width: "20rem",
    //   data: {
    //     item: null, formConfig: {
    //       title: ['', Validators.required],
    //       musicName: ['', Validators.required],
    //     }
    //   }
    // }).afterClosed().subscribe(result => {
    //   if (result === "Create"){
    //     this.ListMovieMusics();
    //   }
    // });
  }

  openDialogEdit(dataResponse: MovieMusic){
    // this.dialog.open(CreateEditComponent, {
    //   disableClose: true,
    //   width: "20rem",
    //   data: {
    //     item: dataResponse, formConfig: {
    //       title: ['', Validators.required],
    //       musicName: ['', Validators.required],
    //     }
    //   }
    // }).afterClosed().subscribe(result => {
    //   if (result === "Edit"){
    //     this.ListMovieMusics();
    //   }
    // });
  }

  openDialogDelete(dataResponse: MovieMusic){
    this.dialog.open(DeleteComponent, {
      disableClose: true,
      data: dataResponse,
    }).afterClosed().subscribe(result => {
      if (result === "Delete"){
        this._movieMusicService.delete(dataResponse.id).subscribe({
          next:(data) => {
            this.showAlert("Register deleted", "OK");
            this.ListMovieMusics();
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

  ListMovieMusics(){
    this._movieMusicService.getList().subscribe({
      next:(dataResponse) => {
        //console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }
}