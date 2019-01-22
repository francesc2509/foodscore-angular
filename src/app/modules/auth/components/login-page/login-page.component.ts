import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services';
import { User } from '../../../../models';

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
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [ Validators.required, Validators.email ]],
            password: ['', [ Validators.required ]]
        });
    }

    login(event) {
        event.preventDefault();

        if (this.loginForm.valid) {
            const email = this.loginForm.get('email').value;
            const password = this.loginForm.get('password').value;

            this.authService.login(email, password).subscribe(
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
}
