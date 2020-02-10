import { Component, OnInit } from '@angular/core';

// importar el modelos y las librerias para poder movernos por rutas
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user.model';

// importamos los servicios
import { UserService } from '../../services/user.service';

// importamos sweetAlert
import Swal from 'sweetalert2';

import { faExclamationTriangle, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [UserService]
})


export class RegisterComponent implements OnInit {

    public title: string;
    public user: User;

    public faExclamationTriangle = faExclamationTriangle;
    public faExclamationCircle = faExclamationCircle;
    public faCheckCircle = faCheckCircle;

    public status: string;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
    ) {
        this.title = 'Registrate';
        this.user = new User('', '', '', '', '', '', 'ROLE_USER', '', '');
    }

    ngOnInit(): void {
        console.log('desde el controlador de register');
    }

    onSubmit(registerForm) {
        // console.log(this.user);
        this._userService.register(this.user).subscribe(
            response => {
                if (response.user && response.user._id) {
                    this.status = 'success';
                    Swal.fire(`El usuario ${response.user.name}, registrado`,
                        'El registro se ha realizado correctamente',
                        'success');
                    registerForm.reset();
                } else {
                    this.status = 'error';
                }
            },
            error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Ah ocurrido un error, ${error}`,
                    footer: 'Vuelva a intertarlo'
                });
            }
        );
    }

}
