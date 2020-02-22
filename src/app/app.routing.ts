import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// importamos los componentes para la navegacion
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user_edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

// Servicios 
import { UserGuard } from './services/user.guard';

const routes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'mis-datos', component: UserEditComponent, canActivate: [UserGuard] },
    { path: 'gente', component: UsersComponent, canActivate: [UserGuard] },
    { path: 'gente/:page', component: UsersComponent, canActivate: [UserGuard] },
    { path: 'timeline', component: TimelineComponent, canActivate: [UserGuard] },
    { path: 'perfil/:id', component: ProfileComponent, canActivate: [UserGuard] },
    { path: 'siguiendo/:id/:page?', component: FollowingComponent, canActivate: [UserGuard] },
    { path: 'seguidores/:id/:page?', component: FollowedComponent, canActivate: [UserGuard] },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const appRoutingProviders: any[] = [];
export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
