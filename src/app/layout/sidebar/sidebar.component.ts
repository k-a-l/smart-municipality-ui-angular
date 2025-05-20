import { Component } from '@angular/core';
import {RouterLink} from "@angular/router"
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";


@Component({
  selector: 'app-sidebar',
  imports: [MatListModule,
  MatIconModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  logout() {
    console.log('logout');
  }
}
