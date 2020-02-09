import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// importamos los componentes para la navegacion
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [

    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const appRoutingProviders: any[] = [];
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
