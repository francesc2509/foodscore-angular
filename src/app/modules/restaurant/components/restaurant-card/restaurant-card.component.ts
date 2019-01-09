import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';

import { Restaurant } from '../../models';
import { days } from '../../../../constants';
import { RestaurantService } from '../../services';

@Component({
    selector: 'fs-restaurant-card',
    templateUrl: './restaurant-card.component.html',
    styleUrls: ['./restaurant-card.component.html'],
})
export class RestaurantCardComponent implements OnInit {
    open: boolean;
    weekDay: number;

    @Input() restaurant: Restaurant;
    @Output() delete = new EventEmitter<Restaurant>();

    constructor(private service: RestaurantService) {}

    ngOnInit() {
        this.weekDay = new Date().getDay();
        this.open = this.restaurant.daysOpen.includes(this.weekDay);
    }

    deleteRestaurant() {
        this.service.deleteRestaurant(this.restaurant.id).subscribe(
            () => this.delete.emit(this.restaurant),
            err => alert(err)
        );
    }

    getDaysString(restaurant: Restaurant): string {
        return restaurant.daysOpen.map(day => days[day]).join(', ');
    }
}
