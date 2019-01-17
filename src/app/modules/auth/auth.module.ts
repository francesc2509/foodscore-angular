import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule,
    MatDividerModule
} from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginPageComponent, RegisterPageComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AuthRoutingModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule,
        MatCardModule,
        MatDividerModule,
        FlexLayoutModule
    ],
    declarations: [
        LoginPageComponent,
        RegisterPageComponent
    ]
})
export class AuthModule {}
