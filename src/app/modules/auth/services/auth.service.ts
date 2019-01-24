import {
    Injectable,
    EventEmitter,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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

    login(email: string, password: string): Observable<void> {
        return this.geolocation.getLocation().pipe(
            switchMap(coords => {
                const { latitude, longitude } = coords;

                return this.http.post<LoginResponse>(
                    `/auth/login`,
                    { email, password, lat: latitude, lng: longitude }
                ).pipe(map(res => {
                    localStorage.setItem(TOKEN_KEY, `${res.accessToken}`);
                    this.logged = true;
                    this.loginChange$.emit(this.logged);
                }));
            })
        );
    }

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
                .pipe(map(res => {
                    if (!res.ok) {
                        return false;
                    }
                    this.loginChange$.emit(true);
                    this.logged = true;
                    return this.logged;
                }));
        }
        return of(false);
    }

    register(user: User): Observable<User> {
        return this.geolocation.getLocation().pipe(
            switchMap(coords => {
                user.lat = coords.latitude;
                user.lng = coords.longitude;

                return this.http.post<User>(
                    `/auth/register`,
                    user
                ).pipe(map(res => {
                    return res;
                }));
            })
        );
    }
}
