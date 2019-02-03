import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './modules/auth/services';
import { Observable } from 'rxjs';

@Component({
    selector: 'fs-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    loading = true;
    logged = false;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.authService.loginChange$.subscribe(
            logged => {
                this.logged = logged;
                this.loading = false;
            },
            err => {
                this.logged = false;
                this.loading = false;
            }
        );
    }

    logout(event) {
        this.authService.logout();
        this.router.navigate(['/auth']);
    }
}
