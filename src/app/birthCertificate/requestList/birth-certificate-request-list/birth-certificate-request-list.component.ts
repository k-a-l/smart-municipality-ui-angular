import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { saveAs } from 'file-saver';
import { BirthCertificateService } from '../../birth-certificate-service.service';
import { CitizenService } from '../../../services/citizen.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-birth-certificate-request-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatProgressBarModule,
    FormsModule,
    MatIcon,
  ],
  templateUrl: './birth-certificate-request-list.component.html',
  styleUrls: ['./birth-certificate-request-list.component.scss'],
})
export class BirthCertificateRequestListComponent implements OnInit {
  requests: any[] = [];
  isLoading = true;
  citizenId!: number;
  userRole: string | null = localStorage.getItem('role');
  rejectionMessage: { [id: number]: string } = {};
  showRejectInput: { [id: number]: boolean } = {};
  router = inject(Router);

  constructor(
      private http: HttpClient,
      private birthCertificateService: BirthCertificateService,
      private citizenService: CitizenService
  ) {}

  ngOnInit(): void {
    if (this.userRole === 'CITIZEN') {
      this.getCitizenId(); // get citizenId before fetching requests
    } else {
      this.fetchRequests(); // for ADMIN or SUPERADMIN
    }
  }

  getCitizenId(): void {
    const email = localStorage.getItem('email');
    if (!email) {
      console.error('No email found in localStorage');
      this.isLoading = false;
      return;
    }

    this.citizenService.findCitizenByUserEmail(email).subscribe({
      next: (citizen) => {
        this.citizenId = citizen.id;
        this.fetchRequests(); // now safe to fetch requests
      },
      error: (err) => {
        console.error('Error fetching citizen ID', err);
        this.isLoading = false;
      },
    });
  }

  fetchRequests(): void {
    if (this.userRole === 'CITIZEN') {
      if (!this.citizenId) {
        console.error('Citizen ID is undefined!');
        this.isLoading = false;
        return;
      }

      this.birthCertificateService
          .getRequestByCitizenId(this.citizenId)
          .subscribe({
            next: (data) => {
              this.requests = data;
              this.isLoading = false;
            },
            error: (err) => {
              console.error('Error loading requests', err);
              this.isLoading = false;
            },
          });
    } else {
      // ADMIN or SUPERADMIN
      this.birthCertificateService.getAllRequests().subscribe({
        next: (data) => {
          this.requests = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading all requests', err);
          this.isLoading = false;
        },
      });
    }
  }

  downloadCertificate(id: number): void {
    this.birthCertificateService.generateBirthCertificate(id).subscribe({
      next: (blob) => saveAs(blob, `birth_certificate_${id}.pdf`),
      error: (err) => console.error('Certificate download failed:', err),
    });
  }

  approve(requestId: number): void {
    this.birthCertificateService.approveRequest(requestId).subscribe({
      next: () => {
        console.log(`Approved request ID: ${requestId}`);
        this.fetchRequests(); // refresh list
      },
      error: (err) => console.error('Approve failed:', err),
    });
  }

  submitRejection(requestId: number): void {
    const message = this.rejectionMessage[requestId];
    if (!message || message.trim() === '') return;

    this.birthCertificateService.rejectRequest(requestId).subscribe({
      next: () => {
        console.log(`Rejected request ID: ${requestId} with reason: ${message}`);
        this.rejectionMessage[requestId] = '';
        this.showRejectInput[requestId] = false;
        this.fetchRequests(); // refresh list
      },
      error: (err) => console.error('Reject failed:', err),
    });
  }

  showReviewRequest(requestId: number): void {
    this.router.navigate(['/birth-certificate-review', requestId]).then((success) => {
      console.log('Navigation success:', success);
    });
  }
}
