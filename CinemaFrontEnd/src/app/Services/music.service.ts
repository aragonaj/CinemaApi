import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {environment} from 'C:/Users/usuario/source/repos/CinemaApi/CinemaFrontEnd/src/environments/environment';
import {Observable} from 'rxjs';
import {Music} from '../Interfaces/music'

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private endpoint:string = environment.endPoint;
  private apirUrl:string = this.endpoint + "music/";

  constructor(private http:HttpClient) { }
  
  getList():Observable<Music[]>{
    return this.http.get<Music[]>(`${this.apirUrl}list`);
  }

  add(model:Music):Observable<Music>{
    return this.http.post<Music>(`${this.apirUrl}save`,model);
  }

  update(id:number, model:Music):Observable<Music>{
    return this.http.put<Music>(`${this.apirUrl}update/${id}`,model);
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apirUrl}delete/${id}`);
  }
}
