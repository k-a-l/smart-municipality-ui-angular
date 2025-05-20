import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getTotalCitizens(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/citizen/count`);
  }

  getTotalRequests(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/certificate/count`);
  }

  getPendingRequests(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/certificate/pending-count`);
  }

  getApprovedRequests(): Observable<number> {
     return this.http.get<number>(`${this.baseUrl}/certificate/approved-count`);
   }

   getRejectedRequests(): Observable<number> {
     return this.http.get<number>(`${this.baseUrl}/certificate/rejected-count`);
  }

  //getAverageProcessingTime(): Observable<number> {
  //   return this.http.get<number>(`${this.baseUrl}/certificate/average-processing-time`);
  // }
}
