import { Component, OnInit } from '@angular/core';

import { User } from '../../../../models';

@Component({
    selector: 'fs-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
    email2 = '';

    user = <User>{};

    constructor() {}

    ngOnInit() {
    }
}
