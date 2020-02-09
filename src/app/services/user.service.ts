import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { GLOBAL } from './global';


@Injectable()
export class UserService {
    private url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    register(user: User): Observable<any> {
        console.log(this.url);
        console.log(user);
    }

}
