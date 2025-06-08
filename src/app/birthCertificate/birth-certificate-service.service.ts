import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface matching the Spring Boot model
export interface Citizen {
  id: number;
  // Add other fields if necessary
}

export interface BirthCertificateRequest {
  id?: number;
  childName: string;
  gender: string;
  dateOfBirth: string; // Use ISO string for compatibility with LocalDate
  citizen: Citizen;
  requestedBy?: number;
  requestedAt?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED'; // match enum values
}

@Injectable({
  providedIn: 'root'
})
export class BirthCertificateService {

  private apiUrl = 'http://localhost:8080/api/v1/certificate';

  constructor(private http: HttpClient) {}

  saveCertificate(request: BirthCertificateRequest): Observable<BirthCertificateRequest> {
    return this.http.post<BirthCertificateRequest>(`${this.apiUrl}/save`, request);
  }

  generateBirthCertificate(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/birth/${id}/generate`, {
      responseType: 'blob',
    });
  }

  downloadCertificateByReferenceNumber(referenceNumber: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${referenceNumber}`, {
      responseType: 'blob',
    });
  }

  countAllRequests(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  countPending(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/pending-count`);
  }

  countApproved(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/approved-count`);
  }

  countRejected(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/rejected-count`);
  }

  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getAllRequests(): Observable<BirthCertificateRequest[]> {
    return this.http.get<BirthCertificateRequest[]>(`${this.apiUrl}/list`);

  }

  getRequestByCitizenId(citizenId: number): Observable<BirthCertificateRequest[]> {
    return this.http.get<BirthCertificateRequest[]>(`${this.apiUrl}/citizen/${citizenId}`);
  }
// birth-certificate-service.service.ts

  approveRequest(id: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/approve/${id}`, {});
  }

  rejectRequest(id: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/reject/${id}`, {});
  }



  getRequestById(id: number): Observable<BirthCertificateRequest> {
    return this.http.get<BirthCertificateRequest>(`${this.apiUrl}/by-id/${id}`);
  }

}
