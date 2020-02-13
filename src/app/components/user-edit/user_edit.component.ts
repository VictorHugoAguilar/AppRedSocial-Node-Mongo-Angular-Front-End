import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';


// Importamos los modelos
import { User } from '../../models/user.model';
import { Message } from '../../models/message.public';

// importamos los servicios
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';

// importamos los iconos necestarios
import { faExclamationTriangle, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// importamos sweetAlert
import Swal from 'sweetalert2';


@Component({
    selector: 'user-edit',
    templateUrl: './user_edit.component.html',
    providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit {

    public title: string;
    public user: User;
    public identity;
    public token;
    public status: string;
    public faExclamationTriangle = faExclamationTriangle;
    public faCheckCircle = faCheckCircle;
    public faExclamationCircle = faExclamationCircle;
    public url;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userSerivice: UserService,
        private _uploadService: UploadService
    ) {
        this.title = 'Editar mis datos';
        this.user = this._userSerivice.getIdentity();
        this.identity = this.user;
        this.token = this._userSerivice.getToken();
        this.url = environment.url;
    }

    ngOnInit(): void {
        // console.log('Componente editar se ha cargado!!!');
        // console.log(this.user);
    }

    onSubmit() {
        // console.log(this.user);
        this._userSerivice.updateUser(this.user).subscribe(
            response => {
                // console.log(response);
                if (!response) {
                    this.status = 'error';
                } else {
                    this.status = 'success';
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    this.identity = this.user;

                    // subida de imagen
                    this._uploadService
                    .makeFileRequest(this.url + 'uploadImage/' + this.user._id, [], this.fileToUpload, this.token, 'image')
                        .then((result: any) => {
                            console.log(result.userUpdate.image);
                            this.user.image = result.userUpdate.image;
                            localStorage.setItem('identity', JSON.stringify(this.user));
                        })
                        .catch(
                            (error: any) => {
                                console.log(error);
                            }
                        );

                    Swal.fire(`El usuario ${this.user.name}, actualizado`,
                        'El registro se ha actualizado correctamente',
                        'success');
                }
            },
            error => {
                // console.log(error);
                if (!error.error.OK) {
                    this.status = 'error';
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Ah ocurrido un error. ${error.error.message}`,
                    footer: `${error.status} - ${error.statusText}`
                });

            }
        );
    }


    public fileToUpload: Array<File>;
    fileChangeEvent(fileInput: any) {
        this.fileToUpload = <Array<File>>fileInput.target.files;
        console.log(this.fileToUpload);
    }


}







