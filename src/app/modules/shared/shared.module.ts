import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OneCheckedDirective } from './directives';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        OneCheckedDirective
    ],
    exports: [
        OneCheckedDirective
    ]
})
export class SharedModule {}
