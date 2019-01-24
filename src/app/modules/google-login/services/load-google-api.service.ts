import { Injectable, Inject, Optional } from '@angular/core';
import { CLIENT_ID } from '../google-login.config';
import { Observable, of, fromEvent, Observer } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoadGoogleApiService {
    client_id: string;
    gauth: gapi.auth2.GoogleAuth = null;
    load$: Observable<gapi.auth2.GoogleAuth> = null;

    constructor(@Optional() @Inject(CLIENT_ID) client_id: string) {
        if (!client_id) {
            throw new Error('GoogleLoginModule: You must call forRoot in your AppModule to pass the CLIENT_ID');
        }
        this.client_id = client_id;
    }

    getAuthApi(): Observable<gapi.auth2.GoogleAuth> {
        if (!this.gauth) {
            // Not finished initialization
            if (!this.load$) {
                // Initialization not started
                this.load$ = this.createLoader();
            }
            return this.load$; // Return observable (emits auth API when loaded)
        }
        return of(this.gauth); // Already loaded
    }

    private createLoader(): Observable<gapi.auth2.GoogleAuth> {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api:client.js';
        script.setAttribute('async', '');
        script.setAttribute('defer', '');
        document.body.appendChild(script);

        return fromEvent(script, 'load').pipe(
            switchMap(e => {
                return Observable.create((observer: Observer<gapi.auth2.GoogleAuth>) => {
                    gapi.load('auth2', () => {
                        const gauth: gapi.auth2.GoogleAuth = gapi.auth2.init({
                            client_id: this.client_id,
                            cookie_policy: 'single_host_origin'
                        });

                        this.gauth = gauth;
                        observer.next(gauth);
                        observer.complete();
                    });
                });
            })
        );
    }
}
