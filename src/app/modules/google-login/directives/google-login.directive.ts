import { Directive, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { LoadGoogleApiService } from '../services/load-google-api.service';

@Directive({
    selector: '[fsGoogleLogin]'
})
export class GoogleLoginDirective implements OnInit {
    @Output() loginOk: EventEmitter<gapi.auth2.GoogleUser> =
        new EventEmitter<gapi.auth2.GoogleUser>();
    @Output() loginError: EventEmitter<string> = new EventEmitter<string>();
    @Output() loadingEnd: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private el: ElementRef,
        private loadService: LoadGoogleApiService
    ) { }

    ngOnInit() {
        this.loadService.getAuthApi().subscribe(
            auth2 => {
                auth2.attachClickHandler(
                    this.el.nativeElement,
                    {},
                    user => this.loginOk.emit(user),
                    error => this.loginError.emit(error)
                );
                this.loadingEnd.emit();
            }
        );
    }
}
