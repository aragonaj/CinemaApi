import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable(
    { providedIn: 'root' }
)

export class GenericService<T> {
    apirUrl = 'http://localhost:5100/api/auth';

    constructor(private _http: HttpClient){}

    get(){}
}