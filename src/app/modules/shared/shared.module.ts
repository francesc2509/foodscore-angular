import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';

import { StarRatingComponent } from './components';
import { OneCheckedDirective, GoBackDirective } from './directives';


@NgModule({
    imports: [
        CommonModule,
        MatIconModule
    ],
    declarations: [
        OneCheckedDirective,
        GoBackDirective,
        StarRatingComponent
    ],
    exports: [
        OneCheckedDirective,
        GoBackDirective,
        StarRatingComponent
    ]
})
export class SharedModule {}
