import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, Router } from '@angular/router';

import { CitizenDocumentUploadComponent } from '../Citizen/citizen-document-upload/citizen-document-upload.component';

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
export class CitizenFormComponent implements OnInit {
  citizenForm: FormGroup;
  citizenId: number | null = null;
  showDocumentUpload = false;
  status: string | null = null;
  marriageStatus: string = '';
  isUpdateMode: boolean = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  @Input() citizen!: any;

  constructor() {
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
      citizenshipNumber: [''],
      marriageStatus: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Handle marriageStatus changes
    this.citizenForm.get('marriageStatus')?.valueChanges.subscribe(value => {
      this.marriageStatus = value;
      if (value !== 'MARRIED') {
        this.citizenForm.get('spouseName')?.reset();
      }
    });

    // Handle two cases: route param or reapply from localStorage
    const idParam = this.route.snapshot.paramMap.get('id');
    const citizenFromStorage = localStorage.getItem('citizenForUpdate');

    if (idParam) {
      this.isUpdateMode = true;
      this.citizenId = +idParam;
      this.loadCitizen(this.citizenId);
    } else if (citizenFromStorage) {
      const citizen = JSON.parse(citizenFromStorage);
      this.isUpdateMode = true;
      this.citizenId = citizen.id;
      this.status = citizen.status;
      this.citizenForm.patchValue(citizen);
    }
  }

  loadCitizen(id: number) {
    const token = localStorage.getItem('jwt');
    if (!token) {
      alert('You are not logged in.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>(`http://localhost:8080/api/v1/citizen/${id}`, { headers })
      .subscribe({
        next: (data) => {
          this.citizenForm.patchValue(data);
          this.status = data.status;
        },
        error: (err) => {
          console.error('Failed to load citizen data:', err);
          alert('Failed to load citizen data');
        }
      });
  }

  onSubmit() {
    console.log('Form submit triggered');
    if (this.citizenForm.invalid) {
      console.warn('Form is invalid', this.citizenForm.value);
      alert('Please fill all required fields correctly!');
      return;
    }

    const token = localStorage.getItem('jwt');
    if (!token) {
      alert('You are not logged in.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const body = this.citizenForm.value;
    console.log('Submitting form data:', body);

    if (this.isUpdateMode && this.citizenId) {
      // Update existing citizen
      this.http.put<any>(
        `http://localhost:8080/api/v1/citizen/update/${this.citizenId}`,
        body,
        { headers }
      ).subscribe({
        next: (response) => {
          alert('Citizen updated successfully!');
          this.status = response.status;
          this.showDocumentUpload = true;
          localStorage.removeItem('citizenForUpdate');
        },
        error: (err) => {
          console.error('Update failed:', err);
          alert('Failed to update citizen');
        }
      });
    } else {
      // Create new citizen
      this.http.post<any>(
        'http://localhost:8080/api/v1/citizen',
        body,
        { headers }
      ).subscribe({
        next: (response) => {
          alert('Citizen created successfully!');
          this.citizenId = response.id;
          this.status = response.status;
          this.showDocumentUpload = true;
        },
        error: (err) => {
          console.error('Creation failed:', err);
          alert('Failed to create citizen');
        }
      });
    }
  }
}

