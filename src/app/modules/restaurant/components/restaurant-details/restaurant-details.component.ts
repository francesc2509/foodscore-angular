import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RestaurantService } from '../../services';
import { Restaurant, Comment } from '../../models';

@Component({
    selector: 'fs-restaurant-details',
    templateUrl: './restaurant-details.component.html'
})
export class RestaurantDetailsComponent implements OnInit {

    restaurant: Restaurant;
    comments: Comment[];

    constructor(
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        this.restaurant = this.route.snapshot.data.restaurant;
    }
}
