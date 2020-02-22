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


@Component({
    selector: 'add',
    templateUrl: './add.component.html',
    providers: [
        FollowService, MessageService, UserService
    ]

})
export class AddComponent implements OnInit {
    public title: string;
    public message: Message;
    public identity;
    public token;
    public url: string;
    public status: string;
    public follows;

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
        this.message = new Message('', '', '', '', this.identity._id, '');
        this.status = '';
    }

    ngOnInit(): void {
        this.getMyFollows();
    }

    onSubmit(form) {
        // console.log(this.message);
        this._messageService.addMessage(this.token, this.message).subscribe(
            response => {
                // console.log(response)
                if (response.messageStored) {
                    this.status = 'success';
                    form.reset();
                } else {
                    this.status = 'error';
                }
            },
            error => {
                const errorMensaje = <any>error;
                console.error(errorMensaje);
                if (errorMensaje) {
                    this.status = 'error';
                }
            }
        );
    }

    getMyFollows() {
        this._followService.getMyFollows(this.token)
            .subscribe(
                response => {
                    // console.log(response.OK);
                    if (response.OK) {
                        this.follows = response.follows;
                    }
                }, error => {
                    const errorMensaje = <any>error;
                    console.error(errorMensaje);
                    if (errorMensaje) {
                        this.status = 'error';
                    }
                }
            );
    }


}
