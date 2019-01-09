import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';
import { User } from '../../../../models';
@Component({
    selector: 'fs-login-page',
    templateUrl: './login-page.component.html'
})
export class LoginPageComponent {

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
                console.log(err);
            }
        );
    }
}
