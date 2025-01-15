import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Validators } from '@angular/forms';


import { DeleteComponent } from '../../dialog/delete/delete.component';

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
  constructor (
    private _musicService: MusicService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.ListMusics();
  }

  openDialogCreate(){
    // this.dialog.open(CreateEditComponent, {
    //   disableClose: true,
    //   width: "20rem",
    //   data: {
    //     item: null, formConfig: {
    //       musicName: ['', Validators.required],
    //       born: ['', Validators.required],
    //       countryName: ['', Validators.required],
    //     }
    //   }
    // }).afterClosed().subscribe(result => {
    //   if (result === "Create"){
    //     this.ListMusics();
    //   }
    // });
  }

  openDialogEdit(dataResponse: Music){
    // this.dialog.open(CreateEditComponent, {
    //   disableClose: true,
    //   width: "20rem",
    //   data: {
    //     item: dataResponse, formConfig: {
    //       musicName: ['', Validators.required],
    //       born: ['', Validators.required],
    //       countryName: ['', Validators.required],
    //     }
    //   }
    // }).afterClosed().subscribe(result => {
    //   if (result === "Edit"){
    //     this.ListMusics();
    //   }
    // });
  }

  openDialogDelete(dataResponse: Music){
    this.dialog.open(DeleteComponent, {
      disableClose: true,
      data: dataResponse,
    }).afterClosed().subscribe(result => {
      if (result === "Delete"){
        this._musicService.delete(dataResponse.id).subscribe({
          next:(data) => {
            this.showAlert("Register deleted", "OK");
            this.ListMusics();
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

  ListMusics(){
    this._musicService.getList().subscribe({
      next:(dataResponse) => {
        console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }
}