import {
    Injectable,
    EventEmitter,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { LoginResponse } from '../models';
import { User } from 'src/app/models';
import { GeolocationService } from '../../shared/services';

const TOKEN_KEY = environment['token-key'];

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private logged = false;
    loginChange$ = new EventEmitter<boolean>();

    constructor(
        private http: HttpClient,
        private geolocation: GeolocationService
    ) {}

    jwt(email: string, password: string): Observable<void> {
        return this.login(`/auth/login`, { email, password });
    }

    googleLogin(token: string) {
        return this.login(`/auth/google`, { token });
    }

    facebookLogin(token: string) {
        return this.login(`/auth/facebook`, { token });
    }

    private login(url: string, data: any) {
        return this.geolocateAndExec<LoginResponse>(url, data)
            .pipe(map(res => {
                this.storeToken(res.accessToken);
            })
        );
    }

    // private login(url: string, data: any) {
    //     return this.geolocation.getLocation().pipe(
    //         switchMap(coords => {
    //             const { latitude, longitude } = coords;
    //             data.lat = latitude;
    //             data.lng = longitude;

    //             return this.http.post<LoginResponse>(
    //                 url,
    //                 data
    //             ).pipe(map(res => {
    //                 this.storeToken(res.accessToken);
    //             }));
    //         })
    //     );
    // }

    logout() {
        localStorage.removeItem(TOKEN_KEY);

        this.logged = false;
        this.loginChange$.emit(this.logged);
    }

    isLogged(): Observable<boolean> {
        if (this.logged) {
            return of(true);
        }

        if (localStorage.getItem(TOKEN_KEY)) {
            return this.http.get<{ok: boolean}>(`/auth/validate`)
                .pipe(
                    map(res => {
                        console.log(res);

                        if (!res.ok) {
                            return false;
                        }
                        this.loginChange$.emit(true);
                        this.logged = true;
                        return this.logged;
                    }),
                    catchError(err => {
                        throw err;
                    })
                );
        }
        return of(false);
    }

    register(user: User): Observable<User> {
        return this.geolocateAndExec<User>(`/auth/register`, user);
    }

    private geolocateAndExec<T>(url: string, data: any): Observable<T> {
        return this.geolocation.getLocation().pipe(
            switchMap(coords => {
                data.lat = coords.latitude;
                data.lng = coords.longitude;

                return this.http.post<T>(
                    url,
                    data
                ).pipe(map(res => {
                    return res;
                }));
            })
        );
    }

    private storeToken(token) {
        localStorage.setItem(TOKEN_KEY, `${token}`);
        this.logged = true;
        this.loginChange$.emit(this.logged);
    }
}
