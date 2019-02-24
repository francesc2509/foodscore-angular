import { Component, OnInit, Input, forwardRef, HostBinding } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, NG_VALIDATORS, Validator } from '@angular/forms';

@Component({
    selector: 'fs-file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileInputComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => FileInputComponent),
            multi: true,
        }
    ]
})
export class FileInputComponent implements OnInit, ControlValueAccessor, Validator {
    image = '';
    err = undefined;
    // Allow the input to be disabled, and when it is make it somewhat transparent.
    @Input() disabled = false;
    @Input() accept = '*.*';

    // Function to call when the rating changes.
    onChange = (image: string) => { };

    // Function to call when the input is touched (when a star is clicked).
    onTouched = () => { };

    get value(): string {
        return this.image;
    }

    ngOnInit() { }

    changeImage(fileInput: HTMLInputElement): void {
        if (!fileInput.files || fileInput.files.length === 0) {
            this.image = '';
            return;
        }
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.addEventListener('loadend', e => {
            this.writeValue(reader.result.toString());
        });
    }

    public validate(c: FormControl) {
        if (c.valid) {
            return null;
        }

        this.err = {
            valid: false,
        };
        return this.err;
    }

    // Allows Angular to update the model (rating).
    // Update the model and changes needed for the view here.
    writeValue(value: string): void {
        this.image = value;
        this.onChange(this.value);
    }

    // Allows Angular to register a function to call when the model (rating) changes.
    // Save the function as a property to call later here.
    registerOnChange(fn: (value: string) => void): void {
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
}
