import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

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
        FormsModule,
        RestaurantRoutingModule,
        SharedModule
    ],
    declarations: [
        RestaurantCardComponent,
        RestaurantFormComponent,
        RestaurantPageComponent,
        RestaurantDetailsComponent,
        RestaurantFilterPipe
    ]
})
export class RestaurantModule {}
