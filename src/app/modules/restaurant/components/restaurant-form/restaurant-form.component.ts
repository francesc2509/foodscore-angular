import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Restaurant } from '../../models';
import { days } from '../../../../constants';
import { RestaurantService } from '../../services';
import { GeolocationService } from '../../../shared/services/geolocation.service';
import { CanComponentDeactivate } from '../../guards';
import { MatDialog } from '@angular/material';
import { ModalConfirmComponent } from 'src/app/modules/shared/components';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'fs-restaurant-form',
    templateUrl: './restaurant-form.component.html',
    styleUrls: ['./restaurant-form.component.html'],
})
export class RestaurantFormComponent implements OnInit, CanComponentDeactivate {
    restaurantForm: FormGroup;

    readonly days = days;
    coords: Coordinates;
    restaurant: Restaurant;
    daysOpen: boolean[];
    image = '';
    submitBtnTxt = 'Create';
    title = 'New restaurant';

    @Output() add = new EventEmitter<Restaurant>();

    constructor(
        private restaurantService: RestaurantService,
        private geolocationService: GeolocationService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.restaurant = this.route.snapshot.data.restaurant;
        this.createForm();
    }

    submit(): void {
        if (this.restaurantForm.valid && this.image) {
            this.daysOpen = Object.values(this.restaurantForm.get('days').value);
            this.setRestaurant();

            let restaurant$;
            if (this.restaurant.id === -1) {
                restaurant$ = this.restaurantService.addRestaurant(this.restaurant);
            } else {
                restaurant$ = this.restaurantService.editRestaurant(this.restaurant);
            }

            restaurant$.subscribe(
                restaurant => {
                    this.add.emit(restaurant);
                    this.createForm();
                    this.router.navigate(['/restaurants']);
                }
            );
        }
    }

    changeImage(event) {
        this.restaurantForm.get('image').valueChanges.subscribe(
            data => this.image = data
        );
    }

    canDeactivate(): Observable<boolean> {
        return this.openModal();
    }

    openModal(): Observable<boolean> {
        if (this.restaurantForm.pristine) {
            return of(true);
        }

        const modalRef = this.dialog.open(ModalConfirmComponent, {
            data: {
                title: 'There are unsaved changes',
                body: 'Would you like to save them?'
            },
            disableClose: true
        });

        return modalRef.afterOpened()
            .pipe(switchMap(() => {
                return modalRef.afterClosed().pipe(
                    switchMap((result: boolean) => {
                        if (result) {
                            if (!this.restaurantForm.valid) {
                                return of(false);
                            }
                            this.setRestaurant();

                            return this.restaurantService
                                .editRestaurant(this.restaurant)
                                .pipe(
                                    catchError(err => {
                                        return of(false);
                                    }),
                                    map(res => {
                                        return !!res;
                                    })
                                );
                        }
                        return of(!result);
                    })
                );
            })
        );
    }

    private createForm(): void {
        let name = '';
        let description = '';
        let cuisine = '';
        this.daysOpen = new Array(7).fill(true);
        let phone = '';
        let coords: Coordinates;
        let address = '';

        const imageControl =  new FormControl('');
        if (this.restaurant) {
            name = this.restaurant.name;
            description = this.restaurant.description;

            cuisine = this.restaurant.cuisine.join(',');

            this.daysOpen.forEach((day, i) => {
                this.daysOpen[i] = this.restaurant.daysOpen.includes(i);
            });
            this.image = this.restaurant.image;
            phone = this.restaurant.phone;
            coords = <Coordinates>{ latitude: this.restaurant.lat, longitude: this.restaurant.lng };
            address = this.restaurant.address;

            this.submitBtnTxt = 'Edit';
            this.title = 'Edit restaurant';
        } else {
            imageControl.setValidators([Validators.required]);
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
            image: imageControl,
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
                coords: [coords, [Validators.required]],
                address: [address, [Validators.required]]
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

    private setRestaurant() {
        let id = -1;

        if (this.restaurant) {
            id = this.restaurant.id;
            this.image = this.restaurantForm.get('image').value || this.restaurant.image;
        }

        const coords = <Coordinates>this.restaurantForm.get('location').get('coords').value;

        this.restaurant = {
            id: id,
            name: this.restaurantForm.get('name').value,
            description: this.restaurantForm.get('description').value,
            address: this.restaurantForm.get('location').get('address').value,
            cuisine: this.restaurantForm.get('cuisine').value.split(','),
            image: this.restaurantForm.get('image').value || this.image,
            phone: this.restaurantForm.get('phone').value,
            lat: coords.latitude,
            lng: coords.longitude,
            daysOpen: this.daysOpen.reduce((daysList, isSelected, i) => isSelected ? [...daysList, i] : daysList, [])
        };
    }
}
