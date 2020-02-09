import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';


@Injectable()
export class UserService {
    private url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = environment.url;
    }

    register(user: User): Observable<any> {
        const params = JSON.stringify(user);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + '/register', params, { headers: headers });


    }

}
