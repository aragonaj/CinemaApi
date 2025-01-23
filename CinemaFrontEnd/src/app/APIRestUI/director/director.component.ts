import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Validators } from '@angular/forms';

import { Director } from '../../interfaces/director';
import { DirectorService } from '../../services/director.service';
import { DirectorDialogComponent } from '../../dialog/director-dialog/director-dialog.component';
import { DeleteComponent } from '../../dialog/delete/delete.component';

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

  constructor (
    private _directorService: DirectorService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.listDirectors();
  }

  openDialogCreate(){
    this.dialog.open(DirectorDialogComponent, {
      disableClose: true,
      width: "20rem",
      data: {
        item: null, formConfig: {
          directorName: ['', Validators.required],
          born: ['', Validators.required],
          country: ['', Validators.required],
        }
      }
    }).afterClosed().subscribe(result => {
      if (result === "ok__added"){
        this.listDirectors();
      }
    });
  }

  openDialogEdit(dataDirector: Director){
    this.dialog.open(DirectorDialogComponent, {
      disableClose: true,
      width: "20rem",
      data: dataDirector,
      // data: {
      //   item: dataResponse, formConfig: {
      //     directorName: ['', Validators.required],
      //     born: ['', Validators.required],
      //     country: ['', Validators.required],
      //   }
      // }
    }).afterClosed().subscribe(result => {
      if (result === "ok__updated"){
        this.listDirectors();
      }
    });
  }

  openDialogDelete(dataResponse: Director){
    this.dialog.open(DeleteComponent, {
      disableClose: true,
      data: dataResponse,
    }).afterClosed().subscribe(result => {
      if (result === "Delete"){
        this._directorService.delete(dataResponse.id).subscribe({
          next:(data) => {
            this.showAlert("Register deleted", "OK");
            this.listDirectors();
          }, 
          error:(e) => {}
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

  listDirectors(){
    this._directorService.getList().subscribe({
      next:(dataResponse) => {
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }
}