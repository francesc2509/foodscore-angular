import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services';

@Component({
    selector: 'fs-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    logged = false;

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
