import { Component } from '@angular/core';
import {DashboardComponent} from '../layout/dashboard/dashboard.component';
import {NavbarComponent} from '../layout/navbar/navbar.component';
import {SidebarComponent} from '../layout/sidebar/sidebar.component';

@Component({
  selector: 'app-super-admin-dashboard',
  imports: [
    DashboardComponent,
    NavbarComponent,
    SidebarComponent
  ],
  templateUrl: './super-admin-dashboard.component.html',
  styleUrl: './super-admin-dashboard.component.scss'
})
export class SuperAdminDashboardComponent {

}
