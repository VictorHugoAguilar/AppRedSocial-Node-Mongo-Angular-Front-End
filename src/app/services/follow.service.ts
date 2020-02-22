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


    getFollowing(token, userId = null, page = 1): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        var url = this.url + 'following/';

        if (userId !== null) {
            url = this.url + 'following/' + userId + '/' + page;
        }

        return this._http.get(url, { headers });
    }

    getFollowed(token, userId = null, page = 1): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        var url = this.url + 'followed/';

        if (userId !== null) {
            url = this.url + 'followed/' + userId + '/' + page;
        }

        return this._http.get(url, { headers });
    }


    getMyFollows(token): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'follows/' + true, { headers });

    }

}


/*
RUTAS APIS

api.get('checkFollow', FollowController.checkFollow);
api.post('/follow', mda.authentification, FollowController.saveFollow);
api.delete('/follow/:id', mda.authentification, FollowController.deleteFollow);
api.get('/following/:id?/:page?', mda.authentification, FollowController.getFollowingUser);
api.get('/followed/:id?/:page?', mda.authentification, FollowController.getFollowedUsers);
api.get('/follows/:followed?', mda.authentification, FollowController.getFollowBacks);

*/