import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService } from '../modules/auth/services';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class LoginActivateGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.authService.isLogged().pipe(
            map(res => {
                if (!res) {
                    this.router.navigate(['/auth/login']);
                    return false;
                }
                return true;
            }),
            catchError(err => {
                this.authService.logout();
                this.router.navigate(['/auth/login']);
                return of(false);
            })
        );
    }
}
