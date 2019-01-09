import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services';
import { Router } from '@angular/router';

@Component({
    selector: 'fs-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    logged: boolean = false;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.authService.loginChange$.subscribe(
            logged => {
                this.logged = logged;

                if (!this.logged) {
                    this.router.navigate(['/auth']);
                }
            }
        );
    }

    logout(event) {
        this.authService.logout();
        event.preventDefault();
    }
}
