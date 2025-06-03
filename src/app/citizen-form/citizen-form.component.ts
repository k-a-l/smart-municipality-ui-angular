import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';        
import {MatIcon} from '@angular/material/icon';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-citizen-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatIcon,
    CommonModule,
  ],
  templateUrl: './citizen-form.component.html',
  styleUrls: ['./citizen-form.component.scss']
})
export class CitizenFormComponent implements OnInit {
  citizenForm!: FormGroup;

  documentTypes = ['NATIONAL_ID', 'BIRTH_CERTIFICATE', 'PASSPORT'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.citizenForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      spouseName: [''],
      dateOfBirth: ['', Validators.required],
      phoneNo: ['', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]],
      fatherName: [''],
      motherName: [''],
      grandfatherName: [''],
      grandmotherName: [''],
      gender: ['', Validators.required],
      nationality: [''],
      district: [''],
      municipality: [''],
      wardNo: [''],
      tole: [''],
      status: ['', Validators.required],
      reasonForRejection: [''],
      verifiedDate: [''],
      verifiedBy: [''],
      documents: this.fb.array([]) // FormArray to hold documents
    });
  }

  get documents(): FormArray {
    return this.citizenForm.get('documents') as FormArray;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      this.documents.push(
        this.fb.group({
          file: [file, Validators.required],
          documentType: ['', Validators.required]
        })
      );
    }
    input.value = '';
  }

  removeDocument(index: number): void {
    this.documents.removeAt(index);
  }

  uploadDocuments(): void {
    if (this.documents.invalid) {
      this.snackBar.open('Please select document types for all files', 'Close', { duration: 3000 });
      return;
    }
    this.snackBar.open('Documents ready to upload!', 'Close', { duration: 2000 });
  }

  onSubmit(): void {
    if (this.citizenForm.invalid) {
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 3000 });
      return;
    }

    const formData = new FormData();
    const citizenData = { ...this.citizenForm.value };
    delete citizenData.documents;

    formData.append('citizenData', new Blob([JSON.stringify(citizenData)], { type: 'application/json' }));

    this.documents.controls.forEach(doc => {
      formData.append('files', doc.get('file')!.value);
      formData.append('documentType', doc.get('documentType')!.value);
    });

    this.http.post('/api/v1/citizen', formData).subscribe({
      next: () => {
        this.snackBar.open('Citizen and documents saved successfully', 'Close', { duration: 3000 });
        this.citizenForm.reset();
        this.documents.clear();
      },
      error: () => {
        this.snackBar.open('Error saving citizen data', 'Close', { duration: 3000 });
      }
    });
  }
}
