import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CvFormComponent } from './components/cv-form/cv-form.component';

// service importation
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { CvService } from './services/cv.service';
import { PasswordMatchDirective } from './directives/password-match.directive';
import { AuthGuard } from './guards/authGuard';
import { EditCVComponent } from './components/edit-cv/edit-cv.component';


// these specify the apps forntend routes
const appRoutes: Routes = [
  {path:'', component: LandingComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'create-cv', component: CvFormComponent, canActivate: [AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path:'cv/edit/:user_id', component: EditCVComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LandingComponent,
    NavbarComponent,
    PasswordMatchDirective,
    DashboardComponent,
    ProfileComponent,
    CvFormComponent,
    EditCVComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, CvService],
  bootstrap: [AppComponent]
})
export class AppModule { }
