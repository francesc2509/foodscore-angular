import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { StarRatingComponent, FileInputComponent, MapboxComponent, ModalConfirmComponent } from './components';
import { OneCheckedDirective, GoBackDirective } from './directives';

import { environment } from '../../../environments/environment';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
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
        MapboxComponent,
        ModalConfirmComponent
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
