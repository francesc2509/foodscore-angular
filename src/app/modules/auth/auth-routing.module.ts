import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent, RegisterPageComponent } from './components';

const routes = <Routes>[
    {
        path: 'register',
        component: RegisterPageComponent,
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
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
export class AuthRoutingModule {}
