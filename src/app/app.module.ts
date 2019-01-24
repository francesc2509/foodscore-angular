import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MenuModule } from './modules/menu/menu.module';
import { AuthTokenInterceptor, BaseUrlInterceptor } from './interceptors';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleLoginModule } from './modules/google-login/google-login.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        MenuModule,
        BrowserAnimationsModule,
        GoogleLoginModule.withConfig('3493852405-i42aed10i54blfjpt7l42i5rtilkpl0j.apps.googleusercontent.com'),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthTokenInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseUrlInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
