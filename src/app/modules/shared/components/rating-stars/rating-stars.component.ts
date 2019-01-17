import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'fs-rating-stars',
    templateUrl: './rating-stars.component.html',
    styleUrls: ['./rating-stars.component.scss']
})
export class StarRatingComponent implements OnInit {

    private _rating = 0;

    fullStars = [];
    emptyStars = [];

    @Input()
    get rating() {
        return this._rating;
    }

    set rating(value) {
        this._rating = value ? Math.round(value) : 0;
        this.setUpStars();
    }

    @Output()
    ratingChange = new EventEmitter<number>();

    @Input()
    stars = 5;

    @Input()
    disabled = false;

    ngOnInit() {
        this.setUpStars();
    }

    setUpStars() {
        this.fullStars = Array(Math.ceil(this.rating)).fill(true);
        this.emptyStars = Array(Math.ceil(this.stars - this.rating)).fill(true);
    }

    starClickHandler(position: number) {
        if (!this.disabled) {
            const tmpRating = position === this.rating ? 0 : position;
            this.ratingChange.emit(tmpRating);
        }
    }
}
