import { Component, OnInit, Input, forwardRef } from '@angular/core';

import { GeolocationService } from '../../services';
import { FormGroup, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

interface MapData {
    coords: Coordinates;
    address?: string;
}

@Component({
    selector: 'fs-mapbox',
    templateUrl: './mapbox.component.html',
    styleUrls: [
        './mapbox.component.scss'
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MapboxComponent),
        multi: true
    }]
})
export class MapboxComponent implements OnInit {
    private _value: MapData;

    position: MapData;

    @Input() formGroup: FormGroup;
    @Input('enable-search') enableSearch = true;
    // Allow the input to be disabled, and when it is make it somewhat transparent.
    @Input() disabled = false;

    // Function to call when the rating changes.
    onChange = (value: MapData) => { };

    // Function to call when the input is touched (when a star is clicked).
    onTouched = () => { };

    get value(): MapData {
        return this._value;
    }

    // Allows Angular to update the model (rating).
    // Update the model and changes needed for the view here.
    writeValue(value: MapData): void {
        this.position = value;
        if (!this.formGroup) {
            this._value =  value;
            this.onChange(this.value);
            return;
        }

        this.formGroup.setValue({
            address: value.address || '',
            coords: value.coords,
        });
    }

    // Allows Angular to register a function to call when the model (rating) changes.
    // Save the function as a property to call later here.
    registerOnChange(fn: (value: MapData) => void): void {
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

    constructor(private geolocationService: GeolocationService) {}

    ngOnInit() {
        let position: MapData = null;

        if (this.formGroup) {
            const address = this.formGroup.get('address').value;
            const coords = <Coordinates> this.formGroup.get('coords').value;
            position = { address, coords };
        }

        if ((!position || !position.coords)) {
            this.geolocationService.getLocation().subscribe(
                data => {

                    if (!this.value) {
                        this.writeValue({ coords: data });
                    }
                },
                err => {
                    this.writeValue({ coords: <Coordinates>{ latitude: 0, longitude: 0 } });
                }
            );
        } else {
            this.writeValue(position);
        }
    }

    changePosition(result) {
        this.writeValue({
            coords: <Coordinates>{
                latitude: result.geometry.coordinates[1] ,
                longitude: result.geometry.coordinates[0]
            },
            address: result.place_name
        });
    }
}
