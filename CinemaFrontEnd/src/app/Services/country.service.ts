import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {environment} from 'C:/Users/usuario/source/repos/CinemaApi/CinemaFrontEnd/src/environments/environment';
import {Observable} from 'rxjs';
import {Country} from '../Interfaces/country'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private endpoint:string = environment.endPoint;
  private apirUrl:string = this.endpoint + "country/";
  
  constructor(private http:HttpClient) { }
  
  getList():Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apirUrl}list`);
  }

  add(model:Country):Observable<Country>{
    return this.http.post<Country>(`${this.apirUrl}save`,model);
  }

  update(id:number, model:Country):Observable<Country>{
    return this.http.put<Country>(`${this.apirUrl}update/{id}`,model);
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apirUrl}delete/{id}`);
  }
}
