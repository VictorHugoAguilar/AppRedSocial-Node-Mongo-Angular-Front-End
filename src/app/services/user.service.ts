import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';


@Injectable()
export class UserService {
    private url: string;
    public identity;
    public token;
    public stats;

    constructor(
        private _http: HttpClient
    ) {
        this.url = environment.url;
    }

    register(user: User): Observable<any> {
        const params = JSON.stringify(user);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'register', params, { headers });
    }

    signup(user: User, token = null): Observable<any> {
        if (token != null) {
            user.token = token;
        }
        const params = JSON.stringify(user);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'login', params, { headers });
    }

    getIdentity() {
        const identity = JSON.parse(localStorage.getItem('identity'));
        if (identity !== 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;
    }

    getToken() {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token !== 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }


    getStats() {
        let stats: any = JSON.parse(localStorage.getItem('stats'));
        if (stats !== 'undefined') {
            this.stats = stats;
        } else {
            this.stats = null;
        }
        return this.stats;
    }

    getCounter(userId = null): Observable<any> {
        console.log('llamando a getCounter user.service');
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());
        console.log('userid', userId);
        if (userId !== null) {
            return this._http.get(this.url + 'counter/' + userId, { headers });
        }
        return this._http.get(this.url + 'counter', { headers });
    }

    updateUser(user: User): Observable<any> {
        let params = JSON.stringify(user);
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());
        return this._http.put(this.url + 'update/' + user._id, params, { headers });
    }

    getUsers(page = null): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());
        return this._http.get(this.url + 'users/' + page, { headers: headers });
    }

    getUser(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());
        return this._http.get(this.url + 'user/' + id, { headers: headers });
    }


}





