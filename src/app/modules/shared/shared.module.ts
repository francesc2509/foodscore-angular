import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { StarRatingComponent, FileInputComponent, MapboxComponent } from './components';
import { OneCheckedDirective, GoBackDirective } from './directives';

import { environment } from '../../../environments/environment';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        NgxMapboxGLModule.withConfig({
            accessToken: environment['mapbox-key']
        }),
        FlexLayoutModule
    ],
    declarations: [
        OneCheckedDirective,
        GoBackDirective,
        StarRatingComponent,
        FileInputComponent,
        MapboxComponent
    ],
    exports: [
        OneCheckedDirective,
        GoBackDirective,
        FileInputComponent,
        StarRatingComponent,
        MapboxComponent
    ]
})
export class SharedModule {}
