import {Component} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {NgApexchartsModule} from 'ng-apexcharts';
import {NavbarComponent} from './Admin/layout/navbar/navbar.component';
import {SidebarComponent} from './Admin/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [

    NgApexchartsModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,


  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smart-municipality';
}
