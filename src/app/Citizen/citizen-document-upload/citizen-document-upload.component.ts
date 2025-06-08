import {Component, Input, numberAttribute, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-citizen-document-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './citizen-document-upload.component.html',
  styleUrls: ['./citizen-document-upload.component.scss']
})
export class CitizenDocumentUploadComponent implements OnInit {
  @Input() status!: any;
  @Input({transform: numberAttribute}) citizenId!: number;

  documentType: string = '';
  files: File[] = [];
  passportPhoto?: File;
  verifiedBy?: number;
  uploadCompleted: boolean = false;

  documentTypes = [
    { value: 'CITIZENSHIP', label: 'Citizenship Card' },
    { value: 'VOTER_ID', label: 'Voter ID Card' },
    { value: 'NATIONAL_ID', label: 'National ID' },
    { value: 'LICENCE', label: 'License' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log("The status is from upload: ", this.status);
  }

  onDocumentFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) this.files = Array.from(input.files);
  }

  onPassportFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.passportPhoto = input.files[0];
  }

  submitAll(): void {
    if (!this.citizenId || !this.documentType || this.files.length === 0 || !this.passportPhoto) {
      alert('Please fill all fields and select both documents and a passport photo.');
      return;
    }

    const formData = new FormData();
    formData.append('citizenId', this.citizenId.toString());
    formData.append('documentType', this.documentType);

    this.files.forEach(file => formData.append('files', file));
    formData.append('files', this.passportPhoto);

    if (this.verifiedBy) {
      formData.append('verifiedBy', this.verifiedBy.toString());
    }

    this.http.post('http://localhost:8080/api/v1/citizen/document/multi-upload', formData)
      .subscribe({
        next: () => {

          alert('All files submitted successfully!');

          this.files = [];
          this.uploadCompleted = true;
          this.passportPhoto = undefined;
          this.documentType = '';
        },
        error: () => {
          alert('Failed to submit files.');
        }
      });
  }
}
