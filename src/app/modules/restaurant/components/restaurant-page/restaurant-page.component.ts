import { OnInit, Component } from '@angular/core';

import { Restaurant } from '../../models';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
    selector: 'fs-restaurant-page',
    templateUrl: './restaurant-page.component.html',
    styleUrls: ['./restaurant-page.component.html']
})
export class RestaurantPageComponent implements OnInit {
    loading = false;
    restaurants: Restaurant[] = [];
    orderByName = false;
    showOpen = false;
    search = '';

    constructor (private service: RestaurantService) {}

    ngOnInit(): void {
        this.loading = true;
        this.service.getRestaurants().subscribe(
            res => {
                console.log(res);
                this.restaurants = res;
            },
            err => console.log(err),
            () => this.loading = false
        );
    }

    addRestaurant(newRest: Restaurant): void {
        this.restaurants = this.restaurants.concat([newRest]);
    }

    deleteRestaurant(restaurant: Restaurant) {
        this.restaurants = this.restaurants.filter(rest => rest !== restaurant);
    }

    showOpenHandler(event: Event) {
        this.showOpen = !this.showOpen;
        event.preventDefault();
    }

    orderByNameHandler(event: Event) {
        this.orderByName = !this.orderByName;
        event.preventDefault();
    }
}
