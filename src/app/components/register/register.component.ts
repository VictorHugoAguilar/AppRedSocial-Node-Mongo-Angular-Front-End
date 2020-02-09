import { Component, OnInit } from '@angular/core';

// importar el modelos y las librerias para poder movernos por rutas
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user.model';

// importamos los servicios
import { UserService } from '../../services/user.service';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [ UserService ]
})


export class RegisterComponent implements OnInit {

    public title: string;
    public user: User;
    public faExclamationTriangle = faExclamationTriangle;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.title = 'Registrate';
        this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
    }

    ngOnInit(): void {
        console.log('desde el controlador de register');
    }

    onSubmit(){
        // console.log(this.user);
        this._userService.register(this.user);
    }

}
