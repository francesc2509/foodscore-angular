import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Restaurant, Comment, GetCommentResponse, GetCommentsResponse } from '../models';
import {
    GetRestaurantsResponse,
    GetRestaurantResponse
} from '../models';
import { environment } from '../../../../environments/environment';
import { Show } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {

    constructor(private http: HttpClient) {}

    private getRestaurants(params = ''): Observable<Restaurant[]> {
        const url = `/restaurants/${params}`;

        return this.http
            .get<GetRestaurantsResponse>(
                url
            ).pipe(map(res => {
               return res.restaurants.map(restaurant => {
                    restaurant.daysOpen = restaurant.daysOpen.map(day => Number(day));
                    restaurant.image = `${environment.baseUrl}/${restaurant.image}`;
                    return restaurant;
               });
        }));
    }

    getAll(): Observable<Restaurant[]> {
        return this.getRestaurants();
    }

    getMine() {
        return this.getRestaurants('mine');
    }

    getByUser(id: number) {
        return this.getRestaurants(`user/${id}`);
    }

    getRestaurant(id: number): Observable<Restaurant> {
        return this.http.get<GetRestaurantResponse>(
            `/restaurants/${id}`
        ).pipe(
            map((res) => {
                debugger;
                console.log(res);
                const restaurant = res.restaurant;
                restaurant.daysOpen = restaurant.daysOpen.map(day => Number(day));
                restaurant.image = `${environment.baseUrl}/${restaurant.image.replace(/\\/gi, '/')}`;
                return restaurant;
            })
        );
    }

    getComments(id: number): Observable<Comment[]> {
        return this.http.get<GetCommentsResponse>(
            `/restaurants/${id}/comments`
        ).pipe(map((res) => {
            return res.comments.map(comment => {
                comment.user.avatar = `${environment.baseUrl}/${comment.user.avatar}`;
                return comment;
            });
        }));
    }

    addComment(comment: Comment, restaurantId: number) {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.post<GetCommentResponse>(
            `/restaurants/${restaurantId}/comments`,
            comment,
            {
                headers: headers
            }

        ).pipe(map((res) => {
            const newComment = res.comment;
            newComment.user.avatar = `${environment.baseUrl}/${newComment.user.avatar}`;
            return newComment;
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
            cuisine: rest.cuisine,
            address: rest.address,
            lat: rest.lat,
            lng: rest.lng,
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

    editRestaurant(rest: Restaurant) {
        const payload = {
            name: rest.name,
            description: rest.description,
            daysOpen: rest.daysOpen.map(day => `${day}`),
            phone: rest.phone,
            image: rest.image,
            cuisine: rest.cuisine,
            address: rest.address,
            lat: Number(rest.lat),
            lng: Number(rest.lng),
        };

        return this.http.put<GetRestaurantResponse>(
            `/restaurants/${rest.id}`,
            payload

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
