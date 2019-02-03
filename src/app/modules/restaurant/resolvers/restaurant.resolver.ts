import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';

import { Restaurant } from '../models';
import { RestaurantService } from '../services';

import {catchError} from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})
export class RestaurantResolver implements Resolve<Restaurant> {
    constructor(
        private service: RestaurantService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Restaurant> {
        return this.service.getRestaurant(route.params['id']).pipe(
            catchError(err => {
                console.log(err);
                this.router.navigate(['/restaurants']);
                return of(null);
            })
        );
    }
}
