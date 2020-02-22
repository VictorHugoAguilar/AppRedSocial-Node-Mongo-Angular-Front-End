import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import * as $ from 'jquery';
import { MomentModule } from 'angular2-moment';

// Importamos los componentes externos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Importamos componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user_edit.component';
import { UsersComponent } from './components/users/users.component';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { PublicationComponent } from './components/publication/publication.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

// Importamos el nuevo modulo de mensajes
import { MessageModule } from './components/mensajes/message.module';
import { UserGuard } from './services/user.guard';
import { UserService } from './services/user.service';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SideBarComponent,
    TimelineComponent,
    PublicationComponent,
    FollowingComponent,
    FollowedComponent,
    ProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    RoutingModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    MessageModule
    
  ],
  providers: [
    appRoutingProviders,
    UserService,
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
