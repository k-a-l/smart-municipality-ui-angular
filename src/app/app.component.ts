import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Admin/layout/navbar/navbar.component';
import { SidebarComponent } from './Admin/layout/sidebar/sidebar.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    NgApexchartsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  isLoginPage(): boolean {
    const hiddenRoutes = ['/login', '/']; // Add other routes if needed
    return hiddenRoutes.includes(this.currentRoute);
  }
}
