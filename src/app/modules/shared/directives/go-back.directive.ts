import { Location } from '@angular/common';
import { Directive, HostListener } from '@angular/core';


@Directive({
    selector: '[fsGoBack]'
})
export class GoBackDirective {
    @HostListener('click')
    goBack = (event) => {
        this.location.back();
    }

    constructor(private location: Location) {}
}
