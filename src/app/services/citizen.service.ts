import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitizenService {
  private baseUrl = 'http://localhost:8080/api/v1/citizen';

  constructor(private http: HttpClient) {}

  // Reject Citizen
  rejectCitizen(citizenId: number, reason: string, verifiedBy: number) {
    const url = `${this.baseUrl}/${citizenId}/reject`;
    const params = new HttpParams().set('verifierId', verifiedBy.toString());
    const body = { reason };

    return this.http.post<void>(url, body, { params });
  }
  getCitizenById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Approve Citizen
  approveCitizen(citizenId: number, verifiedBy: number) {
    const url = `${this.baseUrl}/${citizenId}/approve`;
    const params = new HttpParams().set('verifierId', verifiedBy.toString());

    return this.http.post<void>(url, {}, { params });
  }
  findCitizenByUserEmail(email: string | null) {
    return this.http.get<any>(`${this.baseUrl}/by-email?email=${email}`);
  }

}
