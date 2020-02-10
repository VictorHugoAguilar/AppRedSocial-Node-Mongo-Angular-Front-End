import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Importamos los modelos
import { User } from '../../models/user.model';

// importamos los servicios
import { UserService } from '../../services/user.service';

// importamos los iconos necestarios
import { faExclamationTriangle, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// importamos sweetAlert
import Swal from 'sweetalert2';
import { Message } from '../../models/message.public';


@Component({
    selector: 'user-edit',
    templateUrl: './user_edit.component.html',
    providers: [UserService]
})
export class UserEditComponent implements OnInit {

    public title: string;
    public user: User;
    public identity;
    public token;
    public status: string;
    public faExclamationTriangle = faExclamationTriangle;
    public faCheckCircle = faCheckCircle;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userSerivice: UserService
    ) {
        this.title = 'Editar mis datos';
        this.user = this._userSerivice.getIdentity();
        this.identity = this.user;
        this.token = this._userSerivice.getToken();
    }

    ngOnInit(): void {
        console.log('Componente editar se ha cargado!!!');
        console.log(this.user);
    }

    onSubmit() {
        console.log(this.user);
        this._userSerivice.updateUser(this.user).subscribe(
            response => {
                console.log(response);
                if (!response) {
                    this.status = 'error';
                } else {
                    this.status = 'success';
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    this.identity = this.user;

                    // subida de imagen 

                    Swal.fire(`El usuario ${this.user.name}, actualizado`,
                        'El registro se ha actualizado correctamente',
                        'success');
                }
            },
            error => {
                if (!error.ok) {
                    console.log(error)
                    this.status = 'error';
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Ah ocurrido un error, ${error.name}`,
                    footer: `${error.message}`
                });

            }
        );
    }


}







