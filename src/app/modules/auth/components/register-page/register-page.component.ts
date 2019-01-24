import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { User } from '../../../../models';
import { AuthService } from '../../services';
import { Router } from '@angular/router';


@Component({
    selector: 'fs-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
    registerForm: FormGroup;

    private emailMatcher = (control: AbstractControl): {[key: string]: boolean} => {
        const email = control.get('email');
        const confirm = control.get('email2');

        console.log(control);
        if (!email || !confirm) { return null; }
        return email.value === confirm.value ? null : { nomatch: true };
    }

    constructor(
        private fb: FormBuilder,
        private service: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required]],
            emailGroup: this.fb.group({
                email: ['', [Validators.required, Validators.email]],
                email2: ['', [Validators.required, Validators.email]],
            }, { validator: this.emailMatcher }),
            password: ['', [Validators.required]],
            avatar: ['', [Validators.required]],
        });
        console.log(this.registerForm.get('avatar'));
    }

    submit() {
        if (this.registerForm.valid) {
            const user = <User>{
                avatar: this.registerForm.get('avatar').value,
                name: this.registerForm.get('name').value,
                email: this.registerForm.get('emailGroup').get('email').value,
                password: this.registerForm.get('password').value,
            };

            this.service.register(user).subscribe(
                data => {
                    this.router.navigate(['/auth/login']);
                },
                err => console.log(err)
            );
        }
    }
}
