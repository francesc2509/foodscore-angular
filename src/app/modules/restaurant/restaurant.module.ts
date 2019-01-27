import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatCheckboxModule
} from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { ModalConfirmComponent } from '../shared/components';

import { RestaurantRoutingModule } from './restaurant-routing.module';

import {
    RestaurantCardComponent,
    RestaurantFormComponent,
    RestaurantPageComponent,
    RestaurantDetailsComponent
} from './components';

import { RestaurantFilterPipe } from './pipes';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatSlideToggleModule,
        RestaurantRoutingModule,
        SharedModule,
        MatBadgeModule,
    ],
    declarations: [
        RestaurantCardComponent,
        RestaurantFormComponent,
        RestaurantPageComponent,
        RestaurantDetailsComponent,
        RestaurantFilterPipe
    ],
    entryComponents: [
        ModalConfirmComponent
    ]
})
export class RestaurantModule {}
