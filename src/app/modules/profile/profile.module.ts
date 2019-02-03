import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../shared/shared.module';
import { ProfileDetailsComponent, ProfileEditComponent } from './components';
import { ProfileRoutingModule } from './profile-routing.module';



@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        MatCardModule, MatIconModule, MatButtonModule,
        MatInputModule, MatFormFieldModule,
        FlexLayoutModule,
        SharedModule,
        ProfileRoutingModule
    ],
    declarations: [
        ProfileDetailsComponent,
        ProfileEditComponent,
    ]
})
export class ProfileModule {}
