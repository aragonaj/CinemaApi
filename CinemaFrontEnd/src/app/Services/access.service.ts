import { Injectable } from '@angular/core';
import { appSettings } from '../Settings/appSettings';
import { HttpClient } from '@angular/common/http';
import { environment } from 'C:/Users/usuario/source/repos/CinemaApi/CinemaFrontEnd/src/environments/environment';
import { Observable } from 'rxjs';


import { ApiUser } from '../Interfaces/apiUser';
import { Login } from '../Interfaces/login';
import { ResponseAccess } from '../Interfaces/responseAccess';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private endpoint:string = environment.endPoint;
  private apirUrl:string = appSettings.apiURL;

  constructor(private http:HttpClient) { }

  register(objeto:ApiUser):Observable<ResponseAccess>{
    // return this.http.post<ResponseAccess>(`${this.apirUrl}access/register`, objeto)
    return this.http.post<ResponseAccess>(`${this.apirUrl}/register`, objeto)
  }

  login(objeto:Login):Observable<ResponseAccess>{
    // return this.http.post<ResponseAccess>(`${this.apirUrl}access/login`, objeto)
    return this.http.post<ResponseAccess>(`${this.apirUrl}/login`, objeto)
  }

  // login(credentials: {userEmail:string, password:string}): Observable<any>{
  //   return this.http.post<ResponseAccess>(`${this.apirUrl}/login`, credentials)
  // }
}
