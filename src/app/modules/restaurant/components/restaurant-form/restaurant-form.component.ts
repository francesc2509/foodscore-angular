import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Restaurant } from '../../models';
import { days } from '../../../../constants';
import { RestaurantService } from '../../services';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
    selector: 'fs-restaurant-form',
    templateUrl: './restaurant-form.component.html',
    styleUrls: ['./restaurant-form.component.html'],
})
export class RestaurantFormComponent implements OnInit {
    // @ViewChild('restaurantForm') restaurantForm: FormGroup;

    restaurantForm: FormGroup;

    readonly days = days;
    restaurant: Restaurant;
    daysOpen: boolean[];
    image = '';
    @Output() add = new EventEmitter<Restaurant>();

    constructor(
        private restaurantService: RestaurantService,
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

        if (this.restaurantForm.valid) {
            this.daysOpen = Object.values(this.restaurantForm.get('days').value);
            let id = -1;
            if (this.restaurant) {
                id = this.restaurant.id;
                this.image = this.image || this.restaurant.image;
            }

            this.restaurant = {
                id:  id,
                name: this.restaurantForm.get('name').value,
                description: this.restaurantForm.get('description').value,
                address: 'Fake St. 123',
                cuisine: this.restaurantForm.get('cuisine').value,
                image: this.image,
                phone: this.restaurantForm.get('phone').value,
                lat: 0,
                lng: 0,
                daysOpen: this.daysOpen.reduce((daysList, isSelected, i) => isSelected ? [...daysList, i] : daysList, [])
            };

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

    changeImage(fileInput: HTMLInputElement): void {
        if (!fileInput.files || fileInput.files.length === 0) {
            this.image = '';
            return;
        }
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.addEventListener('loadend', e => {
            this.image = reader.result.toString();
        });
    }

    private createForm(): void {
        let name = '';
        let description = '';
        let cuisine = '';
        this.daysOpen = new Array(7).fill(true);
        let phone = '';

        if (this.restaurant) {
            name = this.restaurant.name;
            description = this.restaurant.description;
            cuisine = this.restaurant.cuisine;
            this.daysOpen.forEach((day, i) => {
                this.daysOpen[i] = this.restaurant.daysOpen.includes(i);
            });
            this.image = this.restaurant.image;
            phone = this.restaurant.phone;
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
