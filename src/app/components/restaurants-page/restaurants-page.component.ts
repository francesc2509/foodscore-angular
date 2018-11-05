import { OnInit, Component } from '@angular/core';

import { Restaurant } from '../../models';

@Component({
    selector: 'fs-restaurants-page',
    templateUrl: './restaurants-page.component.html',
    styleUrls: ['./restaurants-page.component.html'],
})
export class RestaurantsPageComponent implements OnInit {
    readonly days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    readonly weekDay = new Date().getDay();
    daysOpen: boolean[];

    restaurants: Restaurant[] = [];
    newRest: Restaurant;

    ngOnInit(): void {
        this.resetForm();
    }

    addRestaurant(): void {
        this.newRest.daysOpen = this.daysOpen.reduce((days, isSelected, i) => isSelected ? [...days, i] : days, []);
        this.restaurants.push(this.newRest);
        this.resetForm();
    }

    changeImage(fileInput: HTMLInputElement): void {
        if (!fileInput.files || fileInput.files.length === 0) {
            return;
        }
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.addEventListener('loadend', e => {
            this.newRest.image = reader.result.toString();
        });
    }

    resetForm(): void {
        this.newRest = {
            name: '',
            description: '',
            daysOpen: [],
            cuisine: '',
            image: '',
            phone: ''
        };
        this.daysOpen = new Array(7).fill(true);
    }

    getDaysString(restaurant: Restaurant): string {
        return restaurant.daysOpen.map(day => this.days[day]).join(', ');
    }
}
