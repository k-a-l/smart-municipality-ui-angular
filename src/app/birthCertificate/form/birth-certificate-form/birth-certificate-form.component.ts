import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BirthCertificateService, BirthCertificateRequest } from '../../birth-certificate-service.service';
import { CitizenService } from '../../../services/citizen.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-birth-certificate-form',
  standalone: true,
  templateUrl: './birth-certificate-form.component.html',
  styleUrls: ['./birth-certificate-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatProgressBarModule
  ]
})
export class BirthCertificateFormComponent implements OnInit {
  birthForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  email: string | null = localStorage.getItem('email');

  constructor(
    private fb: FormBuilder,
    private certificateService: BirthCertificateService,
    private citizenService: CitizenService
  ) {}

  ngOnInit(): void {
    this.birthForm = this.fb.group({
      childName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nationality: ['', Validators.required],
      district: ['', Validators.required],
      municipality: ['', Validators.required],
      wardNo: ['', Validators.required],
      citizenId: [{ value: '', disabled: true ,hidden: true}, Validators.required],
      requestedBy: [{ value: '', disabled: true , hidden: true}] // Assuming this is set later
    });

    if (this.email) {
      this.fetchCitizenIdByEmail(this.email);
    }
  }

  fetchCitizenIdByEmail(email: string): void {
    this.citizenService.findCitizenByUserEmail(email).subscribe({
      next: (citizen: any) => {
        this.birthForm.patchValue({
          citizenId: citizen.id,
          requestedBy: citizen.id,
          status: citizen.status,
        });
        if (citizen.status != "APPROVED" ) {
          this.errorMessage = 'Your citizen request must be approved.';
          this.isSubmitting = true;

        }
      },
      error: () => {
        this.errorMessage = 'First Verify You Are the Citizen of Nepal';
      }
    });
  }

  submitForm(): void {
    if (this.birthForm.invalid) return;

    this.isSubmitting = true;

    const formValue = this.birthForm.getRawValue();
    const request: BirthCertificateRequest = {
      childName: formValue.childName,
      gender: formValue.gender,
      dateOfBirth: formValue.dateOfBirth,
      citizen: { id: formValue.citizenId },
      requestedBy: formValue.requestedBy,
      municipality: formValue.municipality,
      district: formValue.district,
      wardNo: formValue.wardNo,
      nationality:formValue.nationality
    };

    this.certificateService.saveCertificate(request).subscribe({
      next: () => {
        this.successMessage = 'Birth Certificate Request submitted successfully.';
        this.birthForm.reset();
        this.isSubmitting = false;
      },
      error: () => {
        this.errorMessage = 'Failed to submit the request.';
        this.isSubmitting = false;
      }
    });
  }
}
