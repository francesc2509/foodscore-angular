import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Restaurant } from '../../models';
import { days } from '../../../../constants';
import { RestaurantService } from '../../services';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GeolocationService } from '../../../shared/services/geolocation.service';
import { Observable } from 'rxjs';


@Component({
    selector: 'fs-restaurant-form',
    templateUrl: './restaurant-form.component.html',
    styleUrls: ['./restaurant-form.component.html'],
})
export class RestaurantFormComponent implements OnInit {
    restaurantForm: FormGroup;

    readonly days = days;
    coords: Coordinates;
    restaurant: Restaurant;
    daysOpen: boolean[];
    image = '';
    @Output() add = new EventEmitter<Restaurant>();

    constructor(
        private restaurantService: RestaurantService,
        private geolocationService: GeolocationService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.restaurant = this.route.snapshot.data.restaurant;
        this.createForm();
    }

    submit(): void {
        console.log(this.restaurantForm);

        if (this.restaurantForm.valid && this.image) {
            this.daysOpen = Object.values(this.restaurantForm.get('days').value);
            let id = -1;
            if (this.restaurant) {
                id = this.restaurant.id;
                this.image = this.restaurantForm.get('image').value || this.restaurant.image;
            }

            const coords = <Coordinates>this.restaurantForm.get('location').get('coords').value;

            this.restaurant = {
                id:  id,
                name: this.restaurantForm.get('name').value,
                description: this.restaurantForm.get('description').value,
                address: this.restaurantForm.get('location').get('address').value,
                cuisine: this.restaurantForm.get('cuisine').value,
                image: this.restaurantForm.get('image').value,
                phone: this.restaurantForm.get('phone').value,
                lat: coords.latitude,
                lng: coords.longitude,
                daysOpen: this.daysOpen.reduce((daysList, isSelected, i) => isSelected ? [...daysList, i] : daysList, [])
            };
            debugger;
            if (this.restaurant.id === -1) {
                this.restaurantService.addRestaurant(this.restaurant).subscribe(
                    restaurant => {
                        this.add.emit(restaurant);
                        this.createForm();
                        this.router.navigate(['/restaurants']);
                    }
                );
            } else {
            }
        }
    }

    private createForm(): void {
        let name = '';
        let description = '';
        let cuisine = '';
        this.daysOpen = new Array(7).fill(true);
        let phone = '';
        let coords: Coordinates;
        let address = '';

        if (this.restaurant) {
            name = this.restaurant.name;
            description = this.restaurant.description;
            cuisine = this.restaurant.cuisine;
            this.daysOpen.forEach((day, i) => {
                this.daysOpen[i] = this.restaurant.daysOpen.includes(i);
            });
            this.image = this.restaurant.image;
            phone = this.restaurant.phone;
            coords = <Coordinates>{ latitude: this.restaurant.lat, longitude: this.restaurant.lng };
            address = this.restaurant.address;
        }

        this.restaurantForm = this.fb.group({
            name: new FormControl(
                name,
                [
                    Validators.required,
                    Validators.pattern('^.{5,}$'),
                ]
            ),
            description: new FormControl(
                description,
                [
                    Validators.required
                ]
            ),
            cuisine: new FormControl(
                cuisine,
                [
                    Validators.required
                ]
            ),
            days: this.buildDays(),
            image: new FormControl(''),
            phone: new FormControl(
                phone,
                [
                    Validators.required,
                    Validators.pattern('^((0|\\+)?[0-9]{2})?[0-9]{9}$'),
                ]
            ),
            // location: new FormControl(
            //     {
            //         coords: coords,
            //         address: address
            //     }
            // ),
            location: this.fb.group({
                coords: [ coords, [ Validators.required ] ],
                address: [ address, [ Validators.required ] ]
            }),
        });
    }

    private buildDays(): FormGroup {
        const group = {};
        this.days.forEach((day, i) => {
            group[`days${i}`] = new FormControl(this.daysOpen[i]);
        });
        return this.fb.group(group);
    }
}
