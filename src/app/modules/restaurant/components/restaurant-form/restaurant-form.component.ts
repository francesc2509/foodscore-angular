import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Restaurant } from '../../models';
import { days } from '../../../../constants';
import { RestaurantService } from '../../services';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'fs-restaurant-form',
    templateUrl: './restaurant-form.component.html',
    styleUrls: ['./restaurant-form.component.html'],
})
export class RestaurantFormComponent implements OnInit {
    @ViewChild('restaurantForm') restaurantForm: FormGroup;

    readonly days = days;
    newRest: Restaurant;
    daysOpen: boolean[];
    @Output() add = new EventEmitter<Restaurant>();

    constructor(
        private restaurantService: RestaurantService,
        private router: Router
    ) {}

    ngOnInit() {
        this.daysOpen = new Array(7).fill(true);
        this.resetForm();
    }

    addRestaurant(): void {
        if (this.restaurantForm.valid) {
            this.newRest.daysOpen = this.daysOpen.reduce((daysList, isSelected, i) => isSelected ? [...daysList, i] : daysList, []);
            this.restaurantService.addRestaurant(this.newRest).subscribe(
                restaurant => {
                    this.add.emit(restaurant);
                    this.resetForm();
                    this.router.navigate(['/restaurants']);
                }
            );
        }
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
            phone: '',
            address: 'Fake St. 123',
            lat: 0,
            lng: 0
        };
    }
}
