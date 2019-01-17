import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';
import { User } from '../../../../models';
@Component({
    selector: 'fs-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

    error = undefined;

    user: User = {
        email: '',
        password: ''
    };

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    login(event) {
        this.authService.login(this.user.email, this.user.password).subscribe(
            () => {
                this.router.navigate(['/restaurants']);
            },
            err => {
                this.error = err.error;
                console.log(this.error);
            }
        );
    }
}
