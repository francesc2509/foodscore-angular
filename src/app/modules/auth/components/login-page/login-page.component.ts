import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services';
import { User } from '../../../../models';
import { Observable } from 'rxjs';

@Component({
    selector: 'fs-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    loginForm: FormGroup;
    error = undefined;

    constructor(
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private ngZone: NgZone
    ) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    login(event) {
        event.preventDefault();

        if (this.loginForm.valid) {
            const email = this.loginForm.get('email').value;
            const password = this.loginForm.get('password').value;

            this.subscribe(this.authService.jwt(email, password));
        }
    }

    loggedGoogle(user: gapi.auth2.GoogleUser) {
        // Send this token to your server for register / login
        console.log(user.getAuthResponse().id_token);
        this.ngZone.run(() => {
            //   const name = user.getBasicProfile().getName();
            //   const email = user.getBasicProfile().getEmail();
            //   const avatar = user.getBasicProfile().getImageUrl();
            this.subscribe(this.authService.googleLogin(user.getAuthResponse().id_token));
        });
    }

    loggedFacebook(res: FB.LoginStatusResponse) {
        this.ngZone.run(() => {
            this.subscribe(this.authService.facebookLogin(res.authResponse.accessToken));
        });
    }

    private subscribe(o$: Observable<void>) {
        o$.subscribe(
            () => {
                this.router.navigate(['/restaurants']);
            },
            err => {
                this.error = err.error;
            }
        );
    }
}
