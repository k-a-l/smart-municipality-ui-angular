import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import {NgIf} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [MatListModule, MatIconModule, RouterLink, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  router = inject(Router);

  role: string = localStorage.getItem('role') || 'guest'; // fallback role

  constructor() {
    console.log('Role from localStorage:', this.role);
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  isSuperAdmin(): boolean {
    return this.role === 'SUPERADMIN';
  }

  isCitizen(): boolean {
    return this.role === 'CITIZEN';
  }

  logout(): void {
    console.log('logout');
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/login']);
  }
}
