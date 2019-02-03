import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileDetailsComponent, ProfileEditComponent } from './components';

const routes = <Routes>[
    {
        path: 'edit',
        component: ProfileEditComponent
    },
    {
        path: ':id',
        component: ProfileDetailsComponent
    },
    {
        path: '',
        component: ProfileDetailsComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProfileRoutingModule {}
