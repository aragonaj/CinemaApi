import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Director } from '../Interfaces/director'

@Injectable({
  providedIn: 'root'
})

export class DirectorService {

  private endpoint:string = environment.endPoint;
  private apirUrl:string = this.endpoint + "director/";

  constructor(private http:HttpClient) {}

  getApiUrl() {
    return this.apirUrl;
  }
  
  getList():Observable<Director[]>{
    return this.http.get<Director[]>(`${this.apirUrl}list`);
  }

  add(model:Director):Observable<Director>{
    return this.http.post<Director>(`${this.apirUrl}save`,model);
  }

  update(id:number, model:Director):Observable<Director>{
    return this.http.put<Director>(`${this.apirUrl}update/${id}`,model);
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apirUrl}delete/${id}`);
  }
}
