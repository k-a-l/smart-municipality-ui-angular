// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './Admin/layout/dashboard/dashboard.component';
import { CitizenComponent } from './Admin/citizen/citizen.component';
import { ReviewComponent } from './Admin/citizen/review/review.component';
import { authGuard } from './auth.guard';
import {CitizenFormComponent} from './citizen-form/citizen-form.component';
import {CitizenViewComponent} from './Citizen/citizen-view/citizen-view.component';
import {SuperAdminDashboardComponent} from './Admin/super-admin-dashboard/super-admin-dashboard.component';
import {StaffDasboardComponent} from './Admin/staff-dasboard/staff-dasboard.component';
import {CitizenProfileComponent} from './Citizen/citizen-profile/citizen-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: StaffDasboardComponent, canActivate: [authGuard] },
  { path: 'citizens', component: CitizenComponent, canActivate: [authGuard] },
  { path: 'citizen/review/:id', component: ReviewComponent, canActivate: [authGuard] },
  { path: 'citizen-view', component: CitizenViewComponent, canActivate: [authGuard] },
  {path: 'citizen-form' ,component: CitizenFormComponent  },
  {path:'super-admin-dashboard', component: SuperAdminDashboardComponent},
  {path:'citizen-profile', component: CitizenProfileComponent}


];
