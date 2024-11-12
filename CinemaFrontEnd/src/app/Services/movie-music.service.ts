import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {environment} from 'C:/Users/usuario/source/repos/CinemaApi/CinemaFrontEnd/src/environments/environment';
import {Observable} from 'rxjs';
import {MovieMusic} from '../interfaces/movieMusic'

@Injectable({
  providedIn: 'root'
})
export class MovieMusicService {

  private endpoint:string = environment.endPoint;
  private apirUrl:string = this.endpoint + "movieMusic/";
  
  constructor(private http:HttpClient) { }
  
  getList():Observable<MovieMusic[]>{
    return this.http.get<MovieMusic[]>(`${this.apirUrl}list`);
  }

  add(model:MovieMusic):Observable<MovieMusic>{
    return this.http.post<MovieMusic>(`${this.apirUrl}save`,model);
  }

  update(id:number, model:MovieMusic):Observable<MovieMusic>{
    return this.http.put<MovieMusic>(`${this.apirUrl}update/${id}`,model);
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apirUrl}delete/${id}`);
  }
}
