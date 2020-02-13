import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

// Importamos las variables
import { environment } from '../../environments/environment';

// Importamos el modelo
import { Follow } from '../models/follow.model';


@Injectable()
export class FollowService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = environment.url;
    }


    addFollow(token, follow: Follow): Observable<any> {
        const params = JSON.stringify(follow);
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.post(this.url + 'follow', params, { headers });
    }

    deleteFollow(token, id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.delete(this.url + 'follow/' + id, { headers });
    }
}
