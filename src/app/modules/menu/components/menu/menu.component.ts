import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services';

@Component({
    selector: 'fs-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    @Input() logged = false;
    @Output('logout') logoutChange = new EventEmitter<void>();

    ngOnInit() {}

    logout(event) {
        event.preventDefault();
        this.logoutChange.emit();
    }
}
