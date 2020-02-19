import { OnInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Importamos los servicios
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { UploadService } from '../../services/upload.service';

// Importamos el modelo de publicaciones
import { Publication } from '../../models/publication.model';

// Importamos las variables de entorno
import { environment } from '../../../environments/environment';




@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    providers: [UserService, PublicationService, UploadService]
})
export class SideBarComponent implements OnInit {

    public publication: Publication;
    public identity;
    public token;
    public stats;
    public url;
    public status;
    public filesToUpload: Array<File>;


    constructor(
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _uploadService: UploadService
    ) {
        this.url = environment.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.publication = new Publication('', '', '', '', this.identity._id);
    }

    ngOnInit() {
        console.log('*** desde el componente sidebar ***');
    }

    onSubmit(form, $event) {
        // console.log(this.publication);
        this._publicationService.addPublication(this.token, this.publication).subscribe(
            response => {
                if (response.publication) {
                    if (this.filesToUpload && this.filesToUpload.length) {
                        //Subir la imagen
                        this._uploadService
                            .makeFileRequest(this.url + 'uploadImagePub/' + response.publication._id, [], this.filesToUpload, this.token, 'image')
                            .then((result: any) => {
                                this.status = 'success';
                                this.publication.file = result.image;
                                form.reset();
                                this._router.navigate(['/timeline']);
                                this.sended.emit({ send: 'true' });
                            })
                            .catch(
                                error => {
                                    const errorMessage = <any>error;
                                    console.error(errorMessage);
                                    if (errorMessage != null) {
                                        this.status = 'error';
                                    }
                                }
                            );
                    } else {
                        this.status = 'success';
                        form.reset();
                        this._router.navigate(['/timeline']);
                        this.sended.emit({ send: 'true' });
                    }
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

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }


    // Output
    @Output() sended = new EventEmitter();
    sendPublication(event) {
        // console.log(event)
        this.sended.emit({ send: 'true' });
    }





}




