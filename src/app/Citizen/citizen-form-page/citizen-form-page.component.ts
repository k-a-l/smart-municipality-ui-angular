import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {CitizenFormComponent} from '../../citizen-form/citizen-form.component';

@Component({
  selector: 'app-citizen-form-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    CitizenFormComponent
  ],
  templateUrl: './citizen-form-page.component.html',
  styleUrls: ['./citizen-form-page.component.scss']
})
export class CitizenFormPageComponent implements OnInit {
  loading = true;
  status: 'form' | 'pending' | 'rejected' = 'form';
  rejectionReason: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.http.get<any>(`http://localhost:8080/api/v1/citizen/by-email?email=${email}`).subscribe({
        next: (citizen) => {
          console.log('Existing citizen found:', citizen);
          const status = citizen.status?.toLowerCase();
          if (status === 'approved') {
            this.router.navigate(['/citizen-profile']);
          } else if (status === 'pending') {
            this.status = 'pending';
          } else if (status === 'rejected') {
            this.status = 'rejected';
            this.rejectionReason = citizen.reasonForRejection;
          } else {
            this.status = 'form';
          }
          this.loading = false;
        },
        error: (err) => {
          console.warn('No existing citizen found, showing form.');
          this.status = 'form';
          this.loading = false;
        }
      });
    } else {
      console.warn('No email found in localStorage.');
      this.loading = false;
    }
  }
}
