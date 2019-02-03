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

    constructor(private service: ProfileService, private route: ActivatedRoute) {}

    ngOnInit() {
        let user$: Observable<User>;
        let id = this.route.snapshot.params['id'];


        if (!id) {
            user$ = this.service.getMe();
        } else {
            id = Number(id);

            if (isNaN(id) || id < 1) {
                throw new Error('Invalid id');
            }
            user$ = this.service.getById(id);
        }

        user$.subscribe(
            user => {
                this.user = user;
                this.position = {
                    coords: <Coordinates>{
                        latitude: user.lat, longitude: user.lng
                    }
                };
            }
        );
    }
}
