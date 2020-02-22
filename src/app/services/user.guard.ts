import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';




@Injectable()
export class UserGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _userService: UserService
    ) { }

    canActivate() {
        const identity = this._userService.getIdentity();
        if (identity && (identity.role === 'ROLE_USER' || identity.role === 'ROLE_ADMIN')) {
            return true;
        } else {
            this._router.navigate(['/login']);
            return false;
        }
    }

}


