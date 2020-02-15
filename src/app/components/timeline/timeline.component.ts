import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Importamos el modelo de publication
import { Publication } from '../../models/publication.model';

// Importamos las variables de entorno
import { environment } from '../../../environments/environment';

// Importamos los servicios
import { UserService } from '../../services/user.service';

@Component({
    selector: 'timeline',
    styleUrls: ['./timeline.component.css'],
    templateUrl: './timeline.component.html',
    providers: [UserService]

})
export class TimelineComponent implements OnInit {

    public identity;
    public token;
    public title: string;
    public url: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.identity = _userService.getIdentity();
        this.token = _userService.getToken();
        this.title = 'TimeLine';
        this.url = environment.url;
    }

    ngOnInit() {
        console.log('*** desde el componente timeline');
    }

}

