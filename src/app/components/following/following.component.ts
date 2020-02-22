import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// MODELO
import { User } from '../../models/user.model';
import { Follow } from '../../models/follow.model';

// Importamos los servicios
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';

// Importamos las variables de ambiente
import { environment } from '../../../environments/environment';

// Importamos los iconos
import {
    faPlusCircle, faTimesCircle,
    faUser, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'following',
    templateUrl: './following.component.html',
    providers: [UserService, FollowService]
})
export class FollowingComponent implements OnInit {

    public title: string;
    public url: string;
    public identity;
    public token;
    public page;
    public nextPage;
    public backPage;
    public status: string;
    public total;
    public pages;
    public users: User[];
    public follows;
    public followUserOver;
    public following;
    public userPageId;

    public faPlusCircle = faPlusCircle;
    public faTimesCircle = faTimesCircle;
    public faUser = faUser;
    public faCheckCircle = faCheckCircle;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _followService: FollowService
    ) {
        this.title = 'Usuarios seguidos por ';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = environment.url;
    }


    ngOnInit() {
        // console.log('Desde el componente de users');
        this.actualPage();
    }

    actualPage() {
        this._route.params.subscribe(params => {
            let page = +params.page;
            this.page = page;
            const userId = params.id;
            this.userPageId = userId;
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
            this.getUser(userId, page);
        });
    }

    getFollows(userId, page) {
        this._followService.getFollowing(this.token, userId, page).subscribe(
            response => {
                // console.log(response);
                // console.log('****** USER FOLLOWIN ******', response.usersFollowing);
                if (!response.follows) {
                    this.status = 'error';
                } else {
                    this.total = response.total;
                    this.following = response.follows;
                    this.pages = response.pages;
                    this.follows = response.usersFollowing;
                    if (page > this.pages) {
                        this._router.navigate(['/siguiendo/1']);
                    }
                }
            },
            error => {
                const errorMessage = <any>error;
                console.error(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }


    mouseEnter(userId: string) {
        this.followUserOver = userId;
        // console.log('****** USER_ID *******', userId);
    }

    mouseLeave(userId: string) {
        this.followUserOver = 0;
    }

    followUser(followed) {
        var follow = new Follow('', this.identity._id, followed);
        this._followService.addFollow(this.token, follow).subscribe(
            response => {
                if (!response.follow) {
                    this.status = 'error';
                } else {
                    this.status = 'succes';
                    this.follows.push(followed);
                }
                this.actualPage();
            },
            error => {
                const errorMessage = <any>error;
                console.error(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
            });
    }

    unFollowUser(followed) {
        this._followService.deleteFollow(this.token, followed).subscribe(
            response => {
                const search = this.follows.indexOf(followed);
                if (search !== -1) {
                    this.follows.splice(search, 1);
                    this.status = 'succes';
                }
                this.actualPage();
            },
            error => {
                const errorMessage = <any>error;
                console.error(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
            });
    }

    getUser(userId, page) {
        this._userService.getUser(userId).subscribe(
            response => {
                if (response.user) {
                    this.users = response.user;
                    // Devolver listado de usuarios
                    this.getFollows(userId, page);
                } else {
                    this._router.navigate(['/home']);
                }
            },
            error => {
                const errorMessage = <any>error;
                console.error(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }

}




