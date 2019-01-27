import {
    Directive,
    Output,
    EventEmitter,
    Input,
    ElementRef,
    HostListener
} from '@angular/core';
import { LoadFbApiService } from '../services/load-facebook-api.service';

@Directive({
    selector: '[fsFbLogin]'
})
export class FbLoginDirective {
    @Output() loginOk: EventEmitter<FB.LoginStatusResponse> = new EventEmitter<any>();
    @Output() loginError: EventEmitter<String> = new EventEmitter<String>();
    @Output() loadingEnd: EventEmitter<void> = new EventEmitter<void>();
    @Input() scope: string[];

    constructor(private el: ElementRef, private loadService: LoadFbApiService) {
        loadService.loadApi().subscribe(() => this.loadingEnd.emit());
    }

    @HostListener('click') onClick() {
        this.loadService
            .login(this.scope.join(','))
            .subscribe(
                resp => this.loginOk.emit(resp),
                error => this.loginError.emit('Error with Facebook login!')
            );
    }
}
