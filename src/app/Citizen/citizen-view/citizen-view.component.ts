import { Component } from '@angular/core';
import {MatNavList} from '@angular/material/list';
import {SidebarComponent} from '../../Admin/layout/sidebar/sidebar.component';
import {NavbarComponent} from '../../Admin/layout/navbar/navbar.component';
import {DashboardComponent} from '../../Admin/layout/dashboard/dashboard.component';
import {CitizenDashboardComponent} from '../citizen-dashboard/citizen-dashboard.component';

@Component({
  selector: 'app-Citizen-view',
  standalone: true,

  imports: [
    MatNavList,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    CitizenDashboardComponent
  ],
  templateUrl: './citizen-view.component.html',
  styleUrl: './citizen-view.component.scss'
})
export class CitizenViewComponent {

}
