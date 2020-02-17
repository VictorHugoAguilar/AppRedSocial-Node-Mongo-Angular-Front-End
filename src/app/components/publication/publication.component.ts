import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as $ from 'jquery';

import {  faSurprise, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';


// Importamos el modelo de publication
import { Publication } from '../../models/publication.model';

// Importamos las variables de entorno
import { environment } from '../../../environments/environment';

// Importamos los servicios
import { UserService } from '../../services/user.service';
import { PublicationService,  } from 'src/app/services/publication.service';

@Component({
    selector: 'publication',
    styleUrls: ['./publication.component.css'],
    templateUrl: './publication.component.html',
    providers: [UserService, PublicationService]

})
export class PublicationComponent implements OnInit, DoCheck {

    public faSurprise = faSurprise;
    public faArrowAltCircleDown = faArrowAltCircleDown;
    public identity;
    public token;
    public title: string;
    public url: string;
    public status: string;
    public page: number;
    public publications: Publication[];
    public total;
    public pages;
    public itemPerPage;
    public noMore;
    @Input() user: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService
    ) {
        this.identity = _userService.getIdentity();
        this.token = _userService.getToken();
        this.title = 'Publicaciones';
        this.url = environment.url;
        this.page = 1;
        this.noMore = false;
    }

    ngOnInit() {
        console.log('*** desde el componente publication ***');
        this.getPublication(this.user, this.page);
    }

    ngDoCheck(): void {
    }

    getPublication(user, page, adding = false) {
        this._publicationService.getPublicationsUser(this.token, user, page).subscribe(
            response => {
                if (response.publication) {
                    // console.log(response);
                    this.total = response.total;
                    this.pages = response.pages;
                    this.itemPerPage = response.itemPerPage;

                    if (!adding) {
                        this.publications = response.publication;
                    } else {
                        const arrayA = this.publications;
                        const arrayB = response.publication;
                        // Concateno añado el array b al array a
                        this.publications = arrayA.concat(arrayB);

                        $('html, body').animate({
                            scrollTop:
                                $('html').prop('scrollHeight')
                        }, 1000);
                    }
                    if (page > this.pages) {
                        // this._router.navigate(['/home']);
                    }
                } else {
                    this.status = 'error';
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

    viewMore() {
        this.page += 1;
        if (this.page === this.pages) {
            this.noMore = true;
        }
        this.getPublication(this.user, this.page, true);
    }

}

