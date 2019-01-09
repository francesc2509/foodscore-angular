import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginPageComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AuthRoutingModule,
        FormsModule
    ],
    declarations: [
        LoginPageComponent
    ]
})
export class AuthModule {}
