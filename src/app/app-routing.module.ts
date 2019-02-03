import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogoutActivateGuard, LoginActivateGuard } from './guards';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth'
    },
    {
        path: 'auth',
        loadChildren: './modules/auth/auth.module#AuthModule',
        canActivate: [
            LogoutActivateGuard
        ]
    },
    {
        path: 'restaurants',
        loadChildren: './modules/restaurant/restaurant.module#RestaurantModule',
        canActivate: [
            LoginActivateGuard
        ]
    },
    {
        path: 'profile',
        loadChildren: './modules/profile/profile.module#ProfileModule',
        canActivate: [
            LoginActivateGuard
        ]
    },
    // {
    //     path: '**',
    //     redirectTo: 'auth'
    // }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
