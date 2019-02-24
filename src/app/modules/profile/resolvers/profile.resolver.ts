import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';

import { ProfileService } from '../services';

import {catchError} from 'rxjs/internal/operators';
import { User } from 'src/app/models';

@Injectable({
    providedIn: 'root'
})
export class ProfileResolver implements Resolve<User> {
    constructor(
        private service: ProfileService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        debugger;

        let user$: Observable<User>;
        let id = route.params['id'];

        if (!id) {
            user$ = this.service.getMe();
        } else {
            id = Number(id);

            if (isNaN(id) || id < 1) {
                throw new Error('Invalid id');
            }
            user$ = this.service.getById(id);
        }

        return user$.pipe(
            catchError(err => {
                console.log(err);
                this.router.navigate(['/restaurants']);
                return of(null);
            })
        );
    }
}
