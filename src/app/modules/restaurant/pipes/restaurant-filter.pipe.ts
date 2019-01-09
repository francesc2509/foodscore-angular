import { Pipe, PipeTransform } from '@angular/core';
import { Restaurant } from '../models';

@Pipe({
    name: 'restaurantFilter'
})
export class RestaurantFilterPipe implements PipeTransform {
    transform(value: Restaurant[], orderByName: boolean, showOpen: boolean, search: string): Restaurant[] {
        const dayOfWeek = new Date().getDay();
        const result = value.filter(restaurant => {
            return (search === '' || restaurant.name.toLowerCase().includes(search))
                && (!showOpen || restaurant.daysOpen.includes(dayOfWeek));
        });

        if (orderByName) {
            result.sort((a, b) => {
                const nameA = a.name ? a.name.toLowerCase() : '';
                const nameB = b.name ? b.name.toLowerCase() : '';

                if (nameA < nameB) {
                    return -1;
                } else if (nameA === nameB) {
                    return 0;
                }
                return 1;
            });
        }
        return result;
    }
}
