import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../modules/auth/services';

@Injectable({
    providedIn: 'root'
})
export class LogoutActivateGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(): Observable<boolean> {
        return this.authService.isLogged().pipe(
            map(res => {
                if (res) {
                    this.router.navigate(['/restaurants']);
                    return false;
                }
                return true;
            })
        );
    }
}
