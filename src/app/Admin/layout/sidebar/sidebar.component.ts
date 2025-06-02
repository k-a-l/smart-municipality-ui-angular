import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router"
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";


@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [MatListModule,
  MatIconModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  router = inject(Router);

logout() {
  console.log('logout');
  localStorage.removeItem('jwt');  // Remove token
  this.router.navigate(['/login']); // Redirect to login page
}




}
