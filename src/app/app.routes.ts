import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component'
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        canActivate: [AuthGuard],
        component: HomeComponent
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'login'
    }
];
