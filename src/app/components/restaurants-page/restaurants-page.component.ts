import { OnInit, Component } from '@angular/core';

import { Restaurant } from '../../models';

@Component({
    selector: 'fs-restaurants-page',
    templateUrl: './restaurants-page.component.html',
    styleUrls: ['./restaurants-page.component.html'],
})
export class RestaurantsPageComponent implements OnInit {
    readonly days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOpen: boolean[] = new Array(7).fill(true);
    weekDay: number;

    restaurants: Restaurant[] = [];
    newRest: Restaurant = {
        name: '',
        description: '',
        daysOpen: [],
        cuisine: '',
        image: '',
        phone: ''
    };

    ngOnInit(): void {

    }
}
