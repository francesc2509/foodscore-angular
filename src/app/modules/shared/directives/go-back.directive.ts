import { Location } from '@angular/common';
import { Directive, HostListener } from '@angular/core';


@Directive({
    selector: '[fsGoBack]'
})
export class GoBackDirective {
    @HostListener('click', [`$event`])
    goBack = (event) => {
        event.preventDefault();
        this.location.back();
    }

    constructor(private location: Location) {}
}
