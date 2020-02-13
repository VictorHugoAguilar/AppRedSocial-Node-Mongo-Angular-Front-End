import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

import { environment } from '../../../environments/environment';
import { of } from 'rxjs';




@Component({
    // tslint:disable-next-line: component-selector
    selector: 'users',
    templateUrl: './users.component.html',
    providers: [UserService]
})
export class UsersComponent implements OnInit {

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


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.title = 'Usuarios';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = environment.url;
    }


    ngOnInit() {
        console.log('Desde el componente de users');
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
            // Devolver listado de usuarios
            this.getUsers(page);
        });
    }

    getUsers(page) {
        this._userService.getUsers(page).subscribe(
            response => {
                if (!response.users) {
                    this.status = 'error';
                } else {
                    this.total = response.total;
                    this.users = response.users;
                    this.pages = response.pages;
                    if (page > this.pages) {
                        this._router.navigate(['/gente/1']);
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

}




