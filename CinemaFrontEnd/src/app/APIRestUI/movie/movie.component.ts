import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Validators } from '@angular/forms';

import { DeleteComponent } from '../../dialog/delete/delete.component';
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  //standalone: true,
  //imports: [RouterOutlet, MatPaginator, MatPaginatorModule, MatTableModule, MatFormField, MatLabel],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})

export class MovieComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Title', 'MovieYear', 'RunningTime', 'Actions'];
  dataSource = new MatTableDataSource<Movie>();

  constructor (
    private _movieService: MovieService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.ListMovies();
  }

  openDialogCreate(){
    // this.dialog.open(CreateEditComponent, {
    //   disableClose: true,
    //   width: "20rem",
    //   data: {
    //     item: null, formConfig: {
    //       title: ['', Validators.required],
    //       movieYear: ['', Validators.required],
    //       runningTime: ['', Validators.required],
    //     }
    //   }
    // }).afterClosed().subscribe(result => {
    //   if (result === "Create"){
    //     this.ListMovies();
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
    //       movieYear: ['', Validators.required],
    //       runningTime: ['', Validators.required],
    //     }
    //   }
    // }).afterClosed().subscribe(result => {
    //   if (result === "Edit"){
    //     this.ListMovies();
    //   }
    // });
  }

  openDialogDelete(dataResponse: Movie){
    this.dialog.open(DeleteComponent, {
      disableClose: true,
      data: dataResponse,
    }).afterClosed().subscribe(result => {
      if (result === "Delete"){
        this._movieService.delete(dataResponse.id).subscribe({
          next:(data) => {
            this.showAlert("Register deleted", "OK");
            this.ListMovies();
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

  ListMovies(){
    this._movieService.getList().subscribe({
      next:(dataResponse) => {
        //console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }
}