import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GetProfileResponse } from '../models';
import { User } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    constructor(private http: HttpClient) {}

    getMe(): Observable<User> {
        return this.getProfile(`me`);
    }

    getById(id: number) {
        return this.getProfile(`${id}`);
    }

    updateInfo(user: User) {
        return this.updateProfile(user);
    }

    updateAvatar(user: User) {
        return this.updateProfile(user, 'avatar').pipe(
            map(data => {
                data.avatar = `${environment.baseUrl}/${data.avatar}`;
                return data;
            })
        );
    }

    updatePassword(user: User) {
        return this.updateProfile(user, 'password');
    }

    private updateProfile(user: User, param = '') {
        return this.http.put<{ ok: boolean, avatar: string }>(
            `/users/me/${param}`,
            user
        );
    }

    private getProfile(param: string):  Observable<User> {
        return this.http.get<GetProfileResponse>(`/users/${param}`).pipe(
            map((res) => {
                debugger;
                const user = res.user;
                user.avatar = `${environment.baseUrl}/${user.avatar.replace(/\\/gi, '/')}`;
                return user;
            })
        );
    }
}
