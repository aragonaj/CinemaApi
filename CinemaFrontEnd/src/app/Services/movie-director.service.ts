import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {environment} from 'C:/Users/usuario/source/repos/CinemaApi/CinemaFrontEnd/src/environments/environment';
import {Observable} from 'rxjs';
import {MovieDirector} from '../Interfaces/movieDirector'

@Injectable({
  providedIn: 'root'
})
export class MovieDirectorService {

  private endpoint:string = environment.endPoint;
  private apirUrl:string = this.endpoint + "movieDirector/";
  
  constructor(private http:HttpClient) { }
  
  getList():Observable<MovieDirector[]>{
    return this.http.get<MovieDirector[]>(`${this.apirUrl}list`);
  }

  add(model:MovieDirector):Observable<MovieDirector>{
    return this.http.post<MovieDirector>(`${this.apirUrl}save`,model);
  }

  update(id:number, model:MovieDirector):Observable<MovieDirector>{
    return this.http.put<MovieDirector>(`${this.apirUrl}update/${id}`,model);
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apirUrl}delete/${id}`);
  }
}
