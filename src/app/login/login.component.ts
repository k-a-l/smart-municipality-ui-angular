import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    CommonModule

  ],
  styleUrls: ['./login.component.scss']
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

  constructor(private http: HttpClient, private router: Router) {}

  sendOtp(): void {
    this.clearMessages();

    if (!this.email) {
      this.errorMessage = 'Please enter your email';
      return;
    }

    // First, check if the email already exists
    this.http.get<boolean>(`http://localhost:8080/api/v1/user/check?email=${this.email}`)
      .subscribe({
        next: (exists) => {
          if (exists) {
            this.isNewUser = false;
            this.errorMessage = 'Email already registered. Please log in.';
          } else {
            this.isNewUser = true;

            // Only send OTP if email is not registered
            this.http.post(`http://localhost:8080/api/v1/email/otp/send?email=${this.email}`, {})
              .subscribe({
                next: () => {
                  this.otpSent = true;
                  this.successMessage = 'OTP sent to your email.';
                },
                error: () => {
                  this.errorMessage = 'Failed to send OTP. Please try again.';
                }
              });
          }
        },
        error: () => {
          this.errorMessage = 'Error checking email. Please try again.';
        }
      });
  }


  verifyOtp(): void {
    this.clearMessages();
    if (!this.otp) {
      this.errorMessage = 'Please enter the OTP';
      return;
    }
    this.http.post<any>(`http://localhost:8080/api/v1/email/otp/verify?email=${this.email}&otp=${this.otp}`, {})
      .subscribe({
        next: () => {
          this.otpVerified = true;
          this.successMessage = 'OTP verified. Now set your password.';
        },
        error: () => {
          this.errorMessage = 'Invalid OTP. Please try again.';
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
      },
      error: () => {
        this.errorMessage = 'Failed to set password. Please try again.';
      }
    });
  }

  login(): void {
    this.clearMessages();
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password.';
      return;
    }

    this.http.post<any>('http://localhost:8080/api/v1/user/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('jwt', res.jwtToken || res.token);
        localStorage.setItem('role', res.role); // Save role

        this.successMessage = 'Logged in successfully.';

        // Redirect based on role
        switch (res.role) {
          case 'ADMIN':
            this.router.navigate(['/admin-dashboard']);
            break;
          case 'SUPERADMIN':
            this.router.navigate(['/super-admin-dashboard']);
            break;
          case 'CITIZEN':
          default:
            this.router.navigate(['/citizen-view']);
            break;
        }
      },
      error: () => {
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }





  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
