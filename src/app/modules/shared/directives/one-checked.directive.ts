import { Validator, AbstractControl, FormGroup, NG_VALIDATORS } from '@angular/forms';
import { Directive, forwardRef } from '@angular/core';

@Directive({
    selector: '[fsOneChecked]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => OneCheckedDirective),
        multi: true}
    ]
})
export class OneCheckedDirective implements Validator {
    constructor() { }

    validate(group: AbstractControl): { [key: string]: any } {
        if (group instanceof FormGroup) {
            if (Object.values(group.value).every(v => v === false)) { // No checked
                return { 'fsOneChecked': true };
            }
        }
        return null; // No errors
    }
}
