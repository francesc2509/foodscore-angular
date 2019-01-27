import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule
} from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginPageComponent, RegisterPageComponent } from './components';
import { GoogleLoginModule } from '../google-login/google-login.module';
import { FacebookLoginModule } from '../facebook-login/facebook-login.module';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule,
        MatCardModule,
        MatDividerModule,
        FlexLayoutModule,
        GoogleLoginModule.withConfig('3493852405-i42aed10i54blfjpt7l42i5rtilkpl0j.apps.googleusercontent.com'),
        FacebookLoginModule.forRoot({app_id: '264506843964721', version: 'v3.2'})
    ],
    declarations: [
        LoginPageComponent,
        RegisterPageComponent
    ]
})
export class AuthModule {}
