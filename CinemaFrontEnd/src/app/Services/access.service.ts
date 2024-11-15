import { inject, Injectable } from '@angular/core';
import { appSettings } from '../settings/appSettings';
import { HttpClient } from '@angular/common/http';
import { environment } from 'C:/Users/usuario/source/repos/CinemaApi/CinemaFrontEnd/src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ApiUser } from '../interfaces/apiUser';
import { Login } from '../interfaces/login';
import { ResponseAccess } from '../interfaces/responseAccess';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private endpoint:string = environment.endPoint;
  private apirUrl:string = appSettings.apiURL;

  constructor(private http:HttpClient, private router: Router) { }

  register(objeto:ApiUser):Observable<ResponseAccess>{
    return this.http.post<ResponseAccess>(`${this.apirUrl}/register`, objeto);
  }

  login(objeto:Login):Observable<ResponseAccess>{
    return this.http.post<ResponseAccess>(`${this.apirUrl}/login`, objeto);
  }

  isLoggedIn(): boolean { 
    return !!localStorage.getItem('token'); 
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  validate(token:string):Observable<ResponseAccess>{
    return this.http.get<ResponseAccess>(`${this.apirUrl}/validate?token=${token}`);
  }
}
