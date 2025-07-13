import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class LoginComponent {
  email = '';
  otp = '';
  password = '';
  confirmPassword = '';
  otpSent = false;
  otpVerified = false;
  isNewUser = true;
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  sendOtp(): void {
    this.clearMessages();

    if (!this.email) {
      this.errorMessage = 'Please enter your email';
      return;
    }

    this.loading = true;

    this.http.get<boolean>(`http://localhost:8080/api/v1/user/check?email=${this.email}`)
      .subscribe({
        next: (exists) => {
          if (exists) {
            this.isNewUser = false;
            this.errorMessage = 'Email already registered. Please log in.';
            this.loading = false;
          } else {
            this.isNewUser = true;
            this.http.post(`http://localhost:8080/api/v1/email/otp/send?email=${this.email}`, {})
              .subscribe({
                next: () => {
                  this.otpSent = true;
                  this.successMessage = 'OTP sent to your email.';
                  this.loading = false;
                },
                error: () => {
                  this.errorMessage = 'Failed to send OTP. Please try again.';
                  this.loading = false;
                }
              });
          }
        },
        error: () => {
          this.errorMessage = 'Error checking email. Please try again.';
          this.loading = false;
        }
      });
  }

  verifyOtp(): void {
    this.clearMessages();

    if (!this.otp) {
      this.errorMessage = 'Please enter the OTP';
      return;
    }

    this.loading = true;

    this.http.post<any>(`http://localhost:8080/api/v1/email/otp/verify?email=${this.email}&otp=${this.otp}`, {})
      .subscribe({
        next: () => {
          this.otpVerified = true;
          this.successMessage = 'OTP verified. Now set your password.';
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Invalid OTP. Please try again.';
          this.loading = false;
        }
      });
  }

  setPassword(): void {
    this.clearMessages();

    if (!this.password || !this.confirmPassword) {
      this.errorMessage = 'Please enter and confirm your password.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.loading = true;

    this.http.post<any>('http://localhost:8080/api/v1/user/register', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.successMessage = 'Password set successfully. You can now log in.';
        this.isNewUser = false;
        this.otpSent = false;
        this.otpVerified = false;
        this.password = '';
        this.confirmPassword = '';
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to set password. Please try again.';
        this.loading = false;
      }
    });
  }

  login(): void {
    this.clearMessages();

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password.';
      return;
    }

    this.loading = true;

    this.http.post<any>('http://localhost:8080/api/v1/user/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('jwt', res.jwtToken || res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('email', res.email);
        localStorage.setItem('department', res.department);
        this.successMessage = 'Logged in successfully.';
        this.loading = false;

        switch (res.role) {
          case 'ADMIN':
          case 'SUPERADMIN':
            this.router.navigate(['/admin-dashboard']);
            break;
          case 'CITIZEN':
          default:
            this.router.navigate(['/citizen-view']);
            break;
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Invalid email or password.';
        this.loading = false;
      }
    });
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  isLoginPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/';
  }
}
