import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleLoginDirective } from './directives/google-login.directive';
import { LoadGoogleApiService } from './services/load-google-api.service';
import { CLIENT_ID } from './google-login.config';

@NgModule({
    declarations: [GoogleLoginDirective],
    imports: [
        CommonModule
    ],
    exports: [GoogleLoginDirective]
})
export class GoogleLoginModule {
    static withConfig(client_id: string): ModuleWithProviders {
        return {
            ngModule: GoogleLoginModule,
            providers: [
                { provide: CLIENT_ID, useValue: client_id }
            ]
        };
    }
}
