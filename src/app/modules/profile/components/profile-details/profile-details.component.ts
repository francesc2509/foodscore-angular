import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProfileService } from '../../services';
import { User } from 'src/app/models';
import { Observable } from 'rxjs';

@Component({
    selector: 'fs-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
    user: User;
    position: { address?: string, coords: Coordinates };

    constructor(
        private service: ProfileService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.user = this.route.snapshot.data.user;

        this.position = {
            coords: <Coordinates>{
                latitude: this.user.lat, longitude: this.user.lng
            }
        };
    }
}
