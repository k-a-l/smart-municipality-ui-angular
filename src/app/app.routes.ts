import { Routes } from '@angular/router';
import {DashboardComponent} from './layout/dashboard/dashboard.component';
import {CitizenComponent} from './citizen/citizen.component';
import {ReviewComponent} from './citizen/review/review.component';

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  {path: 'citizens', component: CitizenComponent},
  {path: "citizen/review/:id", component: ReviewComponent},
  ];

