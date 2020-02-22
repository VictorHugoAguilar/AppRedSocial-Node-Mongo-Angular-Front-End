import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Router, Routes, ActivatedRoute } from '@angular/router';

// Modelos
import { Message } from '../../../../models/message.public';
import { Follow } from '../../../../models/follow.model';

// Servicios
import { FollowService } from '../../../../services/follow.service';
import { MessageService } from '../../../../services/message.service';
import { UserService } from '../../../../services/user.service';

import {
    faHome, faList, faUsers, faSignInAlt, faSignOutAlt,
    faEdit, faCaretDown, faUser, faCog, faEnvelope
} from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'received',
    templateUrl: './received.component.html',
    styleUrls: ['./received.component.css'],
    providers: [FollowService, MessageService, UserService]
})
export class ReceivedComponent implements OnInit {
    public title: string;
    public message: Message;
    public identity;
    public token;
    public url: string;
    public status: string;
    public follows;
    public messages: Message[];
    public page: number;
    public total: number;
    public pages: number;

    public faUser = faUser;

    public userPageId;
    public nextPage;
    public backPage;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _followService: FollowService,
        private _messageService: MessageService,
        private _userService: UserService
    ) {
        this.title = 'Envio de mensajes';
        this.url = environment.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.status = '';
    }

    ngOnInit(): void {
        console.log('*** desde component sended ***');
        this.actualPage();
    }

    actualPage() {
        this._route.params.subscribe(params => {
            let page = +params.page;
            this.page = page;

            if (!params.page) {
                page = 1;
            }

            if (!page) {
                this.page = 1;
            } else {
                this.nextPage = page + 1;
                this.backPage = page - 1;

                if (this.backPage <= 0) {
                    this.backPage = 1;
                }
            }
            this.getMessages(this.token, this.page);
        });
    }

    getMessages(token, page) {
        this._messageService.getMyMessages(token, page).subscribe(
            response => {
                console.log(response);
                if (response.OK) {
                    console.log('dentro del if ', response.OK);
                    this.messages = response.messages;
                    this.pages = response.pages;
                    this.total = response.total;
                }
            },
            error => {
                const errorMensaje = <any>error;
                console.error(errorMensaje);
                if (errorMensaje) {
                    this.status = 'error';
                }
            }
        )
    }

}