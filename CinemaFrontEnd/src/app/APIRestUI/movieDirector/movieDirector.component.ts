import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Validators } from '@angular/forms';

import { DeleteComponent } from '../../dialog/delete/delete.component';
import { MovieDirector } from '../../interfaces/movieDirector';
import { MovieDirectorService } from '../../services/movie-director.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-movieDirector',
  //standalone: true,
  //imports: [RouterOutlet, MatPaginator, MatPaginatorModule, MatTableModule, MatFormField, MatLabel],
  templateUrl: './movieDirector.component.html',
  styleUrl: './movieDirector.component.css'
})

export class MovieDirectorComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Title', 'DirectorName', 'Actions'];
  dataSource = new MatTableDataSource<MovieDirector>();
  constructor (
    private _movieDirectorService: MovieDirectorService, 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.ListMovieDirectors();
  }

  openDialogCreate(){
    // this.dialog.open(CreateEditComponent, {
    //   disableClose: true,
    //   width: "20rem",
    //   data: {
    //     item: null, formConfig: {
    //       title: ['', Validators.required],
    //       directorName: ['', Validators.required],
    //     }
    //   }
    // }).afterClosed().subscribe(result => {
    //   if (result === "Create"){
    //     this.ListMovieDirectors();
    //   }
    // });
  }

  openDialogEdit(dataResponse: Movie){
    // this.dialog.open(CreateEditComponent, {
    //   disableClose: true,
    //   width: "20rem",
    //   data: {
    //     item: dataResponse, formConfig: {
    //       title: ['', Validators.required],
    //       directorName: ['', Validators.required],
    //     }
    //   }
    // }).afterClosed().subscribe(result => {
    //   if (result === "Edit"){
    //     this.ListMovieDirectors();
    //   }
    // });
  }

  openDialogDelete(dataResponse: MovieDirector){
    this.dialog.open(DeleteComponent, {
      disableClose: true,
      data: dataResponse,
    }).afterClosed().subscribe(result => {
      if (result === "Delete"){
        this._movieDirectorService.delete(dataResponse.id).subscribe({
          next:(data) => {
            this.showAlert("Register deleted", "OK");
            this.ListMovieDirectors();
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

  ListMovieDirectors(){
    this._movieDirectorService.getList().subscribe({
      next:(dataResponse) => {
        //console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }
}