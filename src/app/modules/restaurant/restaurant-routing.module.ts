import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    RestaurantDetailsComponent,
    RestaurantFormComponent,
    RestaurantPageComponent
} from './components';

import { RestaurantResolver } from './resolvers';
import { Show } from './constants';

const routes = <Routes>[
    {
        path: 'details/:id',
        component: RestaurantDetailsComponent,
        resolve: {
            restaurant: RestaurantResolver
        }
    },
    {
        path: 'add',
        component: RestaurantFormComponent
    },
    {
        path: 'edit/:id',
        component: RestaurantFormComponent,
        resolve: {
            restaurant: RestaurantResolver
        }
    },
    {
        path: '',
        component: RestaurantPageComponent,
        data: { show: Show.ALL }
    },
    {
        path: 'mine',
        component: RestaurantPageComponent,
        data: { show: Show.MINE }
    },
    {
        path: 'user/:id',
        component: RestaurantPageComponent,
        data: { show: Show.USER }
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
export class RestaurantRoutingModule {}
