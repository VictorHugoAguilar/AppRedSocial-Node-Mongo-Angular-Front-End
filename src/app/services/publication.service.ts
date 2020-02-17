import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Importamos las variables
import { environment } from '../../environments/environment';

// Importamos el modelo
import { Follow } from '../models/follow.model';
import { Publication } from '../models/publication.model';
import { User } from '../models/user.model';


@Injectable()
export class PublicationService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = environment.url;
    }

    addPublication(token, publication): Observable<any> {
        const params = JSON.stringify(publication);
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.post(this.url + 'publication', params, { headers });
    }

    getPublication(token, page = 1): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'publications/' + page, { headers });
    }

    getPublicationsUser(token, userId, page = 1): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'publicationsUser/' + userId + '/' + page, { headers });
    }

    deletePublication(token, id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.delete(this.url + 'publication/' + id, { headers });
    }

}