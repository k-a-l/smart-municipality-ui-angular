import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitizenService {
  private baseUrl = 'http://localhost:8080/api/v1/citizen';

  constructor(private http: HttpClient) {}

  // Reject Citizen
  rejectCitizen(citizenId: number, reason: string, verifiedBy: number) {
    const url = `${this.baseUrl}/${citizenId}/reject`;
    const params = new HttpParams().set('verifiedBy', verifiedBy.toString());
    const body = { reason };

    return this.http.post<void>(url, body, { params });
  }

  // Approve Citizen
  approveCitizen(citizenId: number, verifiedBy: number) {
    const url = `${this.baseUrl}/${citizenId}/approve`;
    const params = new HttpParams().set('verifiedBy', verifiedBy.toString());

    return this.http.post<void>(url, {}, { params });
  }
}
