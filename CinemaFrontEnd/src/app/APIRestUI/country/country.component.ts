import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Validators } from '@angular/forms';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';
import { CountryDialogComponent } from '../../dialog/country-dialog/country-dialog.component';
import { DeleteComponent } from '../../dialog/delete/delete.component';


// 
// https://www.youtube.com/watch?v=7USizyX1tAQ

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['CountryName', 'Actions'];
  dataSource = new MatTableDataSource<Country>();

  constructor(
    private _countryService: CountryService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listCountries();
  }

  addNewCountry() {
    this.dialog.open(CountryDialogComponent, {
      disableClose: true,
      width: "20rem",
      data: {
        item: null, formConfig: {
          countryName: ['', Validators.required]
        }
      }
    }).afterClosed().subscribe(result => {
      if (result === "ok__added") {
        this.listCountries();
      }
    });
  }

  openDialogEdit(dataCountry: Country) {
    this.dialog.open(CountryDialogComponent, {
      disableClose: true,
      width: "20rem",
      data: dataCountry
      // data: {
      //   item: dataCountry, formConfig: {
      //     countryName: ['', Validators.required]
      //   }
      // }
    }).afterClosed().subscribe(result => {
      if (result === "ok__updated") {
        this.listCountries();
      }
    });
  }

  openDialogDelete(dataResponse: Country) {
    this.dialog.open(DeleteComponent, {
      disableClose: true,
      data: dataResponse
    }).afterClosed().subscribe(result => {
      if (result === "Delete") {
        this._countryService.delete(dataResponse.id).subscribe({
          next: (data) => {
            this.showAlert("Register deleted", "OK");
            this.listCountries();
          },
          error: (e) => { }
        });
      }
    });
  }

  showAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 6000
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  listCountries() {
    this._countryService.getList().subscribe({
      next: (dataResponse) => {
        this.dataSource.data = dataResponse;
      },
      error: (e) => { }
    });
  }
}
