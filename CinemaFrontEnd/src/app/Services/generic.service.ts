import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import {environment} from 'C:/Users/usuario/source/repos/CinemaApi/CinemaFrontEnd/src/environments/environment';
import { appSettings } from "../settings/appSettings";
import { Observable } from "rxjs";

@Injectable(
    { providedIn: 'root' }
)

export class GenericService<T> {
    private _apiUrl = environment.endPoint;

    constructor(private _http: HttpClient) { }

    getList(): Observable<T[]> { 
        return this._http.get<T[]>(this._apiUrl); 
    } 
    
    add(item: T): Observable<T> { 
        return this._http.post<T>(this._apiUrl, item); 
    } 
    
    update(id: number, item: T): Observable<T> { 
        return this._http.put<T>(`${this._apiUrl}/${id}`, item); 
    } 
    
    delete(id: number): Observable<void> {
         return this._http.delete<void>(`${this._apiUrl}/${id}`); 
    }
}