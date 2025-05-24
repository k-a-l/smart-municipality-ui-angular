import {Component} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {NgApexchartsModule} from 'ng-apexcharts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [

    NgApexchartsModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    SidebarComponent,
    NavbarComponent,
    RouterOutlet,



  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smart-municipality';
}
