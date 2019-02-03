import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';

import { Restaurant } from '../../models';
import { days } from '../../../../constants';
import { RestaurantService } from '../../services';
import { ModalConfirmComponent } from 'src/app/modules/shared/components';


@Component({
    selector: 'fs-restaurant-card',
    templateUrl: './restaurant-card.component.html',
    styleUrls: ['./restaurant-card.component.html'],
})
export class RestaurantCardComponent implements OnInit {
    private position;

    open: boolean;
    weekDay: number;
    fullStars = [];
    emptyStars = [];
    avatar: SafeStyle;

    @Input() restaurant: Restaurant;
    @Output() delete = new EventEmitter<Restaurant>();

    constructor(
        private service: RestaurantService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.weekDay = new Date().getDay();
        this.open = this.restaurant.daysOpen.includes(this.weekDay);
        // this.avatar = this.sanitizer.bypassSecurityTrustStyle(`url(${this.restaurant.avatar})`);
    }

    deleteRestaurant() {
        const modalRef = this.dialog.open(ModalConfirmComponent, {
            data: {
                title: 'This action cannot be reverted',
                body: `Do you want to remove the restaurant called ${this.restaurant.name}?`
            },
            disableClose: true
        });

        modalRef.afterClosed().subscribe(
            result => {
                if (result) {
                    this.service.deleteRestaurant(this.restaurant.id).subscribe(
                        () => this.delete.emit(this.restaurant),
                        err => alert(err)
                    );
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    getDaysString(restaurant: Restaurant): string {
        return restaurant.daysOpen.map(day => days[day]).join(', ');
    }
}
