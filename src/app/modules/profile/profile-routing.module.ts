import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileDetailsComponent, ProfileEditComponent } from './components';
import { ProfileResolver } from './resolvers';

const routes = <Routes>[
    {
        path: 'edit',
        component: ProfileEditComponent,
        resolve: {
            user: ProfileResolver
        }
    },
    {
        path: ':id',
        component: ProfileDetailsComponent,
        resolve: {
            user: ProfileResolver
        }
    },
    {
        path: '',
        component: ProfileDetailsComponent,
        resolve: {
            user: ProfileResolver
        }
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
