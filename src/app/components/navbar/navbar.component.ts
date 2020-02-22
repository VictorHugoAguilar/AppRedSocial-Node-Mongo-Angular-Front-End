import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Importamos los servicios
// Importamos los iconos desde fortawesome
import {
    faHome, faList, faUsers, faSignInAlt, faSignOutAlt,
    faEdit, faCaretDown, faUser, faCog, faEnvelope
} from '@fortawesome/free-solid-svg-icons';

// Servicios
import { UserService } from '../../services/user.service';

// Variables de entorno
import { environment } from '../../../environments/environment';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    providers: [UserService]
})
export class NavBarComponent implements OnInit {
    public titulo: string;
    public url: string;
    public identity;
    public faHome = faHome;
    public faList = faList;
    public faUsers = faUsers;
    public faSignInAlt = faSignInAlt;
    public faSignOutAlt = faSignOutAlt;
    public faEdit = faEdit;
    public faCaretDown = faCaretDown;
    public faUser = faUser;
    public faCog = faCog;
    public faEnvelope = faEnvelope;

    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.titulo = 'Red Social Angular';
        this.url = environment.url;
    }

    ngOnInit(): void {
        this.identity = this._userService.getIdentity();
        // console.log(this.identity);
    }

    ngDoCheck(): void {
        this.identity = this._userService.getIdentity();
    }

    logout(): void {
        //console.log('Saliendo de la app');
        localStorage.clear();
        this.identity = null;
        this._router.navigate(['/']);
    }
}