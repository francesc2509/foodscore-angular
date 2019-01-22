import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'fs-rating-stars',
    templateUrl: './rating-stars.component.html',
    styleUrls: ['./rating-stars.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => StarRatingComponent),
            multi: true
        }
    ]
})
export class StarRatingComponent implements OnInit, ControlValueAccessor {

    private _value = 0;

    fullStars = [];
    emptyStars = [];

    @Input()
    stars = 5;

    // Allow the input to be disabled, and when it is make it somewhat transparent.
    @Input() disabled = false;

    // Function to call when the rating changes.
    onChange = (value: number) => { };

    // Function to call when the input is touched (when a star is clicked).
    onTouched = () => { };

    get value(): number {
        return this._value;
    }
    ngOnInit() {
        this.setUpStars();
    }

    setUpStars() {
        this.fullStars = Array(Math.ceil(this.value)).fill(true);
        this.emptyStars = Array(Math.ceil(this.stars - this.value)).fill(true);
    }

    // Allows Angular to update the model (rating).
    // Update the model and changes needed for the view here.
    writeValue(value: number): void {
        this._value =  Math.round(value);
        this.setUpStars();
        this.onChange(this.value);
    }

    // Allows Angular to register a function to call when the model (rating) changes.
    // Save the function as a property to call later here.
    registerOnChange(fn: (value: number) => void): void {
        this.onChange = fn;
    }

    // Allows Angular to register a function to call when the input has been touched.
    // Save the function as a property to call later here.
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    // Allows Angular to disable the input.
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    starClickHandler(position: number) {
        if (!this.disabled) {
            const tmpRating = position === this.value ? 0 : position;
            this.writeValue(tmpRating);
        }
    }
}
