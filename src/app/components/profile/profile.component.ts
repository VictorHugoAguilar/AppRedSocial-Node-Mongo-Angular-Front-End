import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Importamos los modelos
import { User } from '../../models/user.model';
import { Follow } from '../../models/follow.model';

// Importamos los servicios
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';

// Importamos las variables de entorno
import { environment } from '../../../environments/environment';

@Component({
    selector: 'profile',
    styleUrls: ['./profile.component.scss'],
    templateUrl: './profile.component.html',
    providers: [UserService, FollowService]
})
export class ProfileComponent implements OnInit {

    public title: string;
    public user: User;
    public status: string;
    public identity;
    public token;
    public stats;
    public follow;
    public url;
    public followed: boolean;
    public following: boolean;
    public followUserOver;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _followService: FollowService
    ) {
        this.identity = _userService.getIdentity();
        this.token = _userService.getToken();
        this.stats = _userService.getStats();
        this.url = environment.url;
        this.title = 'Perfil';
        this.followed = false;
        this.following = false;
    }

    ngOnInit() {
        // console.log('*** desde el profile ***');
        this.loadPage();
    }

    loadPage() {
        this._route.params.subscribe(params => {
            // console.log('**** desde loadpage ***', params);
            const id = params.id;
            this.getUser(id);
            this.getCounters(id);
        });

    }

    getUser(id) {
        this._userService.getUser(id).subscribe(
            response => {
                // console.log('*** Desde la funcion getUser -id- ***', response);
                if (response.user) {
                    this.user = response.user;

                    if (response.following) {

                        if (response.following._id) {
                            this.following = true;
                        } else {
                            this.following = false;
                        }
                    }
                    if (response.followed) {

                        if (response.followed._id) {
                            this.followed = true;
                        } else {
                            this.followed = false;
                        }
                    }
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
                this._router.navigate(['/perfil/', this.identity._id]);
            }
        );
    }

    getCounters(id) {
        this._userService.getCounter(id).subscribe(
            response => {
                // console.log('*** desde el counters ***', response);
                if (response) {
                    this.stats = response;
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

    followUser(followed) {
        const follow = new Follow('', this.identity._id, followed);
        this._followService.addFollow(this.token, follow).subscribe(
            response => {
                this.following = true;
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

    unFollowUser(followed) {
        this._followService.deleteFollow(this.token, followed).subscribe(
            response => {
                this.following = false;
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

    mouseEnter(userId) {
        // console.log('*** desde mouseEnter - profileComponent ***', userId);
        this.followUserOver = userId;
    }

    mouseLeave() {
        // console.log('*** desde mouseLeave - profileComponent ***');
        this.followUserOver = 0;
    }

}