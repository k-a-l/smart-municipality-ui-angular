import { Component } from '@angular/core';
import {NavbarComponent} from '../layout/navbar/navbar.component';
import {SidebarComponent} from '../layout/sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';
import {DashboardComponent} from '../layout/dashboard/dashboard.component';

@Component({
  selector: 'app-staff-dasboard',
  imports: [
    NavbarComponent,
    SidebarComponent,
    RouterOutlet,
    DashboardComponent
  ],
  templateUrl: './staff-dasboard.component.html',
  styleUrl: './staff-dasboard.component.scss'
})
export class StaffDasboardComponent {

}
