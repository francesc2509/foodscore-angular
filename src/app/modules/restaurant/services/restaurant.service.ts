import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Restaurant, Comment } from '../models';
import {
    GetRestaurantsResponse,
    GetRestaurantResponse
} from '../models';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {

    constructor(private http: HttpClient) {}

    getRestaurants(): Observable<Restaurant[]> {
        return this.http
            .get<GetRestaurantsResponse>(
                `/restaurants`
            ).pipe(map(res => {
               return res.restaurants.map(restaurant => {
                    restaurant.daysOpen = restaurant.daysOpen.map(day => Number(day));
                    restaurant.image = `${environment.baseUrl}/${restaurant.image}`;
                    restaurant.avatar = `${environment.baseUrl}/${restaurant.avatar.replace(/\\/gi, '/')}`;
                    return restaurant;
               });
        }));
    }

    getRestaurant(id: number): Observable<Restaurant> {
        return this.http.get<GetRestaurantResponse>(
            `/restaurants/${id}`
        ).pipe(
            map((res) => {
                const restaurant = res.restaurant;
                restaurant.daysOpen = restaurant.daysOpen.map(day => Number(day));
                restaurant.image = `${environment.baseUrl}/${restaurant.image}`;
                restaurant.avatar = `${environment.baseUrl}/${restaurant.avatar.replace(/\\/gi, '/')}`;
                return restaurant;
            })
        );
    }

    getComments(id: number): Observable<Comment[]> {
        return this.http.get<{comments: Comment[]}>(
            `/restaurants/${id}/comments`
        ).pipe(map((res) => {
            return res.comments.map(comment => {
                comment.user.avatar = `${environment.baseUrl}/${comment.user.avatar}`;
                return comment;
            });
        }));
    }

    addRestaurant(rest: Restaurant): Observable<Restaurant> {
        const h = new HttpHeaders();
        const payload = {
            name: rest.name,
            description: rest.description,
            daysOpen: rest.daysOpen.map(day => `${day}`),
            phone: rest.phone,
            image: rest.image,
            cuisine: rest.cuisine.split(','),
            address: 'Fake St. 123',
            lat: 0,
            lng: 0,
        };

        h.append('Content-Type', 'application/json');
        return this.http.post<GetRestaurantResponse>(
            `/restaurants`,
            payload,
            {
                headers: h
            }

        ).pipe(map((res) => {
            return res.restaurant;
        }));
    }

    deleteRestaurant(id: number): Observable<number> {
        return this.http.delete<{id: number}>(
            `/restaurants/${id}`
        ).pipe(map((res) => {
            return res.id;
        }));
    }
}
