import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitizenService } from '../../../services/citizen.service';
import { MunicipalityService } from '../../../services/municipality.service';
import { DocumentService } from '../../../services/document.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {UserServiceService} from '../../../User/user-service.service';
import {MatCard} from '@angular/material/card';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatFormField, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCard, MatProgressSpinner,
  MatFormField, MatLabel],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  citizen: any;
  citizenId!: number;
  rejectForm: FormGroup;
  showRejectForm = false;
  verifiedBy: number | null = null;// Assuming this is set somewhere in your application logic

  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private citizenService: CitizenService,
    private fb: FormBuilder,
    private muniService: MunicipalityService,
    private documentService: DocumentService,
    private sanitizer: DomSanitizer
  ) {
    this.rejectForm = this.fb.group({ reason: [''] });
  }

  ngOnInit(): void {
    this.citizenId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCitizenDetails();
    this.getCitizenDocuments();
    this.userService.findUserByEmail(localStorage.getItem('email')).subscribe({
      next: (user) => {
        this.verifiedBy = user.id; // Assuming user has an 'id' property
      },
      error: (err) => console.error('Error fetching user:', err)
    });

  }



  getCitizenDetails() {
    this.muniService.getCitizenById(this.citizenId).subscribe({
      next: (data) => this.citizen = data,
      error: (err) => console.error('Error fetching citizen:', err)
    });
  }

  getCitizenDocuments() {
    this.documentService.getCitizenDocumentByCitizenId(this.citizenId).subscribe({
      next: (data) => {
        const docs = Array.isArray(data) ? data : [];
        this.citizen = this.citizen || {};
        this.citizen.documents = docs.map((doc: any) => {
          const contentType = this.getMimeType(doc.fileName);
          const blob = this.base64ToBlob(doc.fileData, contentType);
          const url = URL.createObjectURL(blob);
          // Use sanitizer to trust the blob URL
          const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          return { ...doc, previewUrl: safeUrl, contentType, rawUrl: url };
        });
      },
      error: (err) => console.error('Error fetching documents:', err)
    });
  }
  approveCitizen() {
    if (this.verifiedBy === null) {
      alert('Verifier not loaded.');
      return;
    }
    this.citizenService.approveCitizen(this.citizenId, this.verifiedBy).subscribe({
      next: () => {
        localStorage.setItem("citizen",this.citizen)
        console.log(this.citizen);
        alert('Citizen approved successfully.');
        this.router.navigate(['/citizens']);
      }
    });
  }

  rejectCitizen() {
    const reason = this.rejectForm.value.reason;
    if (!reason) {
      alert('Please provide a reason.');
      return;
    }

    if (this.verifiedBy === null) {
      alert('Verifier not loaded.');
      return;
    }

    this.citizenService.rejectCitizen(this.citizenId, reason, this.verifiedBy).subscribe({
      next: () => {
        alert('Citizen rejected successfully.');
        this.router.navigate(['/citizens']);
      }
    });
  }

  toggleRejectForm() {
    this.showRejectForm = !this.showRejectForm;
  }

  getMimeType(fileName: string): string {
    const ext = fileName.toLowerCase();
    if (ext.endsWith('.pdf')) return 'application/pdf';
    if (ext.endsWith('.jpg') || ext.endsWith('.jpeg')) return 'image/jpeg';
    if (ext.endsWith('.png')) return 'image/png';
    return 'application/octet-stream';
  }

  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  downloadDocument(doc: any) {
    const a = document.createElement('a');
    a.href = doc.rawUrl;
    a.download = doc.fileName;
    a.click();
  }
}
