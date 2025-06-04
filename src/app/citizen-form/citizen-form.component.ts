import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import {CitizenDocumentUploadComponent} from '../Citizen/citizen-document-upload/citizen-document-upload.component';

@Component({
  selector: 'app-citizen-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    CitizenDocumentUploadComponent
  ],
  templateUrl: './citizen-form.component.html',
  styleUrls: ['./citizen-form.component.scss']
})
export class CitizenFormComponent {
  citizenForm: FormGroup ;
  citizenId: number | null = null; // to hold created citizen ID
  showDocumentUpload = false;
  status: string | null = null; // default status

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.citizenForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      spouseName: [''],
      nationality: ['', Validators.required],
      district: ['', Validators.required],
      municipality: ['', Validators.required],
      wardNo: ['', [Validators.required, Validators.min(1)]],
      tole: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      grandfatherName: ['', Validators.required],
      grandmotherName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNo: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log('Form submit triggered'); // debug

    if (this.citizenForm.invalid) {
      console.warn('Form is invalid', this.citizenForm.value); // debug
      return;
    }

    this.http.post<any>('http://localhost:8080/api/v1/citizen', this.citizenForm.value).subscribe({
      next: (response) => {
        console.log('Response from backend:', response); // debug
        alert('Citizen saved successfully!');
        this.citizenId = response.id;
        this.status = response.status;
        console.log("The status is ",this.status)
        this.showDocumentUpload = true;
      },
      error: (err) => {
        console.error('Error occurred:', err); // debug
        alert('Failed to save citizen');
      }
    });
  }

}
