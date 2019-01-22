import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

import { User } from '../../../../models';


@Component({
    selector: 'fs-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
    registerForm: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.registerForm = this.fb.group({
            name: ['', [ Validators.required ] ],
            emailGroup: this.fb.group({
                email: ['', [ Validators.required, Validators.email ] ],
                email2: [ '', [ Validators.required, Validators.email ] ],
            }),
            password: ['', [ Validators.required ]],
            avatar: ['', [ Validators.required ] ],
            lat: [ '' ],
            lng: [ ''],
            address: ['']
        });
        console.log(this.registerForm.get('avatar'));
    }

    submit() {
        console.log(this.registerForm);
    }

    // comparisonValidator(): ValidatorFn {
    //     return (control: AbstractControl): ValidationErrors => {
    //        if (control.value === '' || this.) {
    //           return {notEquivalent: true};
    //        }
    //        return null;
    //     };
    // }
}
