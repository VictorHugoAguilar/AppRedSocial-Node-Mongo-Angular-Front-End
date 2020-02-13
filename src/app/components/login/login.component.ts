import {
    Component,
    OnInit
} from '@angular/core';

import {
    Router,
    ActivatedRoute,
    Params
} from '@angular/router';

import {
    faMailBulk,
    faExclamationTriangle,
    faExclamationCircle,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

// Importamos los modelos
import { User } from '../../models/user.model';

// Importamos los servicios
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserService]

})

export class LoginComponent implements OnInit {
    public title: string;

    public faMailBulk = faMailBulk;
    public faExclamationTriangle = faExclamationTriangle;
    public faExclamationCircle = faExclamationCircle;
    public faCheckCircle = faCheckCircle;

    public user: User;
    public status: string;
    public identity;
    public token;

    constructor(
        // tslint:disable: variable-name
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.title = 'Identificate';
        this.user = new User('', '', '', '', '', '', 'ROLE_USER', '', '');
    }

    ngOnInit() {
        console.log('Login Component');
    }

    onSubmit() {
        this._userService.signup(this.user).subscribe(
            response => {
                this.identity = response.user;
                // console.log(this.identity);
                if (!this.identity || !this.identity._id) {
                    this.status = 'error';
                } else {
                    this.status = 'success';
                    // Persistir datos del usuario
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    // Conseguir el token
                    this.getToken();
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

    getToken() {
        this._userService.signup(this.user, 'true').subscribe(
            response => {
                this.token = response.token;
                // console.log(this.token);
                if (this.token.length <= 0) {
                    this.status = 'error';
                } else {
                    // Persistir el token del usuario
                    localStorage.setItem('token', this.token);
                    // Conseguir los contadores o estadisticas del usuario
                    this.getCounter();
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

    getCounter() {
        this._userService.getCounter().subscribe(
            response => {
                console.log(response);
                if (response) {
                    localStorage.setItem('stats', JSON.stringify(response));
                    this.status = 'success';
                    // redireccion a la página de inicio
                    this._router.navigate(['/']);
                }
            },
            error => {
                const errorMensaje = <any>error;
                console.log(errorMensaje);
                if (errorMensaje) {
                    this.status = 'error';
                }
            }
        );
    }




}
