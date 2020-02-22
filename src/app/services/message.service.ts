import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Importamos las variables
import { environment } from '../../environments/environment';

// Importamos el modelo
import { Message } from '../models/message.public';

@Injectable()
export class MessageService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = environment.url;

    }

    addMessage(token, message): Observable<any> {
        const params = JSON.stringify(message);
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.post(this.url + 'message', params, { headers });
    }

    getMyMessages(token, page = 1): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'messagesMe/' + page, { headers });
    }

    getEmmitMessages(token, page = 1): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'messagesTo/' + page, { headers });
    }

}


/*

ROUTAS API

api.post('/message', mda.authentification, MessageController.saveMessage);
api.get('/messagesMe/:page?', mda.authentification, MessageController.getReceivedMessages);
api.get('/messagesTo/:page?', mda.authentification, MessageController.getEmmitMessages);
api.get('/messageNoView', mda.authentification, MessageController.getUnviewedMessages);
api.put('/messageView', mda.authentification, MessageController.setViewMessage);
*/