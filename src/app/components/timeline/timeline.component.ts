import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as $ from 'jquery';

import { faPlusCircle, faArrowAltCircleDown, faImage, faWindowClose } from '@fortawesome/free-solid-svg-icons';


// Importamos el modelo de publication
import { Publication } from '../../models/publication.model';

// Importamos las variables de entorno
import { environment } from '../../../environments/environment';

// Importamos los servicios
import { UserService } from '../../services/user.service';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
    selector: 'timeline',
    styleUrls: ['./timeline.component.css'],
    templateUrl: './timeline.component.html',
    providers: [UserService, PublicationService]

})
export class TimelineComponent implements OnInit, DoCheck {

    public identity;
    public token;
    public title: string;
    public url: string;
    public status: string;
    public page: number = 1;
    public publications: Publication[];
    public total;
    public pages;
    public itemPerPage;
    public noMore = false;
    public faPlusCircle = faPlusCircle;
    public faArrowAltCircleDown = faArrowAltCircleDown;
    public faImage = faImage;
    public faWindowClose = faWindowClose;
    public showImage;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService
    ) {
        this.identity = _userService.getIdentity();
        this.token = _userService.getToken();
        this.title = 'TimeLine';
        this.url = environment.url;
    }

    ngOnInit() {
        console.log('*** desde el componente timeline');
        this.getPublication(this.page);
    }

    ngDoCheck(): void {

    }

    getPublication(page, adding = false) {
        this._publicationService.getPublication(this.token, page).subscribe(
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
                                $('body').prop('scrollHeight')
                        }, 2000);
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
        this.getPublication(this.page, true);
    }

    refresh(event) {
        // console.log('desde timeline', event);
        this.getPublication(1);
    }

    showThisImage(id) {
        this.showImage = id;
    }

    hideThisImage() {
        this.showImage = 0;
    }

}

