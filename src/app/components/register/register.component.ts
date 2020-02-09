import { Component, OnInit } from '@angular/core';

// importar el modelos y las librerias para poder movernos por rutas
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user.model';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})


export class RegisterComponent implements OnInit {

    public title: string;
    public user: User;
    public faExclamationTriangle = faExclamationTriangle;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.title = 'Registrate';
        this.user = new User('', '', '', '', '', '', 'USER_ROLE', '');
    }

    ngOnInit(): void {
        console.log('desde el controlador de register');

    }

}
