import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
// import { environment } from 'C:/Users/usuario/source/repos/CinemaApi/CinemaFrontEnd/src/environments/environment';
import { environment } from 'C:/Users/usuario/source/repos/CinemaApi/CinemaFrontEnd/src/environments/environment';
import { Observable } from 'rxjs';
import { Movie } from '../Interfaces/movie'

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private endpoint:string = environment.endPoint;
  private apirUrl:string = this.endpoint + "movie/";
  
  constructor(private http:HttpClient) {}
  
  getApiUrl() {
    return this.apirUrl;
  }

  getList():Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.apirUrl}list`);
  }

  add(model:Movie):Observable<Movie>{
    return this.http.post<Movie>(`${this.apirUrl}save`,model);
  }

  update(id:number, model:Movie):Observable<Movie>{
    return this.http.put<Movie>(`${this.apirUrl}update/${id}`,model);
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apirUrl}delete/${id}`);
  }
}
