import { OnInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Importamos los servicios
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';

// Importamos el modelo de publicaciones
import { Publication } from '../../models/publication.model';

// Importamos las variables de entorno
import { environment } from '../../../environments/environment';


@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    providers: [UserService, PublicationService]
})
export class SideBarComponent implements OnInit {

    public publication: Publication;
    public identity;
    public token;
    public stats;
    public url;
    public status;


    constructor(
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _route: ActivatedRoute,
        private _router: Router,
    ) {
        this.url = environment.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.publication = new Publication('', '', '', '', this.identity._id);
    }

    ngOnInit() {
        console.log('*** desde el componente sidebar ****');
    }

    onSubmit(form) {
        console.log(this.publication);
        this._publicationService.addPublication(this.token, this.publication).subscribe(
            response => {
                if (response.publication) {
                    this.status = 'success';
                    form.reset();
                    this._router.navigate(['/timeline']);
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

    // Output
    @Output() sended = new EventEmitter();
    sendPublication(event) {
        console.log(event)
        this.sended.emit({ send: 'true' });
    }





}




