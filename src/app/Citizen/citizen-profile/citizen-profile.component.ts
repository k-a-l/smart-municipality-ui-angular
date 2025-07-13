import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { DocumentService } from '../../services/document.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { CitizenService } from '../../services/citizen.service';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';
import {MatListItem} from '@angular/material/list';

interface Citizen {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  spouseName?: string;
  nationality: string;
  district: string;
  municipality: string;
  wardNo: number;
  tole: string;
  fatherName: string;
  motherName: string;
  grandfatherName: string;
  grandmotherName: string;
  dateOfBirth: string;
  phoneNo: string;
  status: string;
  documents?: any[];
}

@Component({
  selector: 'app-citizen-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, DatePipe, MatProgressSpinner, MatIcon, RouterLinkActive, MatListItem, RouterLink],
  template: `
    <mat-card *ngIf="loading" class="loading-card">
      <mat-spinner diameter="40"></mat-spinner>
      <p>Loading profile...</p>
    </mat-card>

    <mat-card *ngIf="!loading && citizen && isApproved(); else notApproved" class="profile-card">
      <h2 class="section-title">Citizen Profile</h2>
      <div class="info-grid">
        <div class="info-pair" *ngFor="let field of profileFields">
          <label>{{ field.label }}</label>
          <span>{{ field.value }}</span>
        </div>
      </div>

      <mat-card *ngIf="citizen.documents?.length" class="documents-section">
        <h3 class="section-title">Uploaded Documents</h3>
        <div class="document-grid">
          <div class="document-card" *ngFor="let doc of citizen.documents">
            <p class="file-name">{{ doc.fileName }}</p>
            <ng-container [ngSwitch]="doc.contentType">
              <iframe *ngSwitchCase="'application/pdf'" [src]="doc.previewUrl" width="100%" height="300px" class="doc-preview"></iframe>
              <img *ngSwitchCase="'image/jpeg'" [src]="doc.previewUrl" class="doc-image" />
              <img *ngSwitchCase="'image/png'" [src]="doc.previewUrl" class="doc-image" />
              <a *ngSwitchDefault [href]="doc.rawUrl" target="_blank">Download File</a>
            </ng-container>
          </div>
        </div>
      </mat-card>
    </mat-card>

    <ng-template #notApproved>
      <mat-card class="not-approved">
        <mat-icon color="warn">warning</mat-icon>
        <p class="not-approved-message">Citizen information is only visible if approved.</p>
        <button mat-raised-button color="primary" routerLink="/citizen-view" class="request-button">
          Request Access
        </button>      </mat-card>
    </ng-template>
  `,
  styles: [`
    .loading-card, .not-approved {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 250px;
      font-size: 18px;
      color: #555;
    }

    .profile-card {
      padding: 24px;
      margin: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .request-button {
      width: 160px;
      font-weight: 600;
      font-size: 16px;
      border-radius: 24px;
      padding: 12px 0;
      transition: background-color 0.3s ease;
    }

    .request-button:hover {
      background-color: #ca36ad; /* darker primary color on hover */
      color: #fff;
    }

    .section-title {
      font-size: 24px;
      margin-bottom: 20px;
      font-weight: 600;
      color: #2c3e50;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }

    .info-pair {
      display: flex;
      flex-direction: column;
      background: #f9f9f9;
      padding: 12px;
      border-radius: 8px;
    }

    .info-pair label {
      font-weight: 600;
      color: #607d8b;
      margin-bottom: 4px;
      font-size: 14px;
    }

    .info-pair span {
      font-size: 16px;
      color: #37474f;
    }

    .documents-section {
      margin-top: 40px;
      padding: 16px;
    }

    .document-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }

    .document-card {
      border: 1px solid #ddd;
      padding: 12px;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

    .file-name {
      font-weight: 500;
      margin-bottom: 10px;
    }

    .doc-image {
      width: 100%;
      max-height: 300px;
      object-fit: contain;
      border-radius: 4px;
    }

    .doc-preview {
      border: none;
      border-radius: 4px;
    }

    .not-approved-message {
      font-size: 18px;
      color: #d32f2f;
      margin-top: 10px;
      font-weight: bold;
    }
  `]

})
export class CitizenProfileComponent implements OnInit {
  citizen: Citizen | null = null;
  loading = true;
  citizenId: number | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private citizenService: CitizenService,
    private fb: FormBuilder,
    private documentService: DocumentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.http.get<Citizen>(`http://localhost:8080/api/v1/citizen/by-email?email=${email}`)
        .subscribe({
          next: (data) => {
            this.citizen = data;
            this.citizenId = data.id;
            this.loading = false;
            this.getCitizenDocuments();
          },
          error: (err) => {
            console.error('Failed to fetch citizen:', err);
            this.loading = false;
          }
        });
    } else {
      console.warn('Email not found in localStorage.');
      this.loading = false;
    }
  }

  isApproved(): boolean {
    return this.citizen?.status?.toLowerCase() === 'approved';
  }

  getCitizenDocuments(): void {
    if (!this.citizenId) return;

    this.documentService.getCitizenDocumentByCitizenId(this.citizenId).subscribe({
      next: (data) => {
        const docs = Array.isArray(data) ? data : [];
        this.citizen=  this.citizen || null;
        this.citizen! .documents = docs.map((doc: any) => {
          const contentType = this.getMimeType(doc.fileName);
          const blob = this.base64ToBlob(doc.fileData, contentType);
          const url = URL.createObjectURL(blob);
          const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          return { ...doc, previewUrl: safeUrl, contentType, rawUrl: url };
        });
      },
      error: (err) => console.error('Error fetching documents:', err)
    });
  }

  getMimeType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return 'application/pdf';
      case 'jpg':
      case 'jpeg': return 'image/jpeg';
      case 'png': return 'image/png';
      default: return 'application/octet-stream';
    }
  }

  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = Array.from(slice).map(char => char.charCodeAt(0));
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: contentType });
  }
  get profileFields() {
    if (!this.citizen) return [];

    return [
      { label: 'Name', value: `${this.citizen.firstName} ${this.citizen.middleName || ''} ${this.citizen.lastName}` },
      { label: 'Gender', value: this.citizen.gender },
      { label: 'Spouse Name', value: this.citizen.spouseName || 'N/A' },
      { label: 'Nationality', value: this.citizen.nationality },
      { label: 'District', value: this.citizen.district },
      { label: 'Municipality', value: this.citizen.municipality },
      { label: 'Ward No', value: this.citizen.wardNo },
      { label: 'Tole', value: this.citizen.tole },
      { label: 'Father\'s Name', value: this.citizen.fatherName },
      { label: 'Mother\'s Name', value: this.citizen.motherName },
      { label: 'Grandfather\'s Name', value: this.citizen.grandfatherName },
      { label: 'Grandmother\'s Name', value: this.citizen.grandmotherName },
      { label: 'Date of Birth', value: new Date(this.citizen.dateOfBirth).toLocaleDateString() },
      { label: 'Phone No', value: this.citizen.phoneNo },
      { label: 'Status', value: this.citizen.status },
    ];
  }

}
