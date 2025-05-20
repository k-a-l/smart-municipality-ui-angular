import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  // CitizenController
  createCitizen(citizen: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/citizen`, citizen);
  }

  updateCitizen(id: number, citizen: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/citizen/update?id=${id}`, citizen);
  }

  getAllCitizens(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/citizen/list`);
  }

  getCitizenCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/citizen/count`);
  }

  getMaleCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/citizen/male-count`);
  }

  getFemaleCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/citizen/female-count`);
  }

  getOthersCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/citizen/others-count`);
  }

  deleteCitizen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/citizen/delete/${id}`);
  }

  // DigitalSignatureController
  verifySignature(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/digital-signature/verify`, payload);
  }

  // CitizenDocumentController
  uploadDocument(file: File, citizenId: number, documentType: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('citizenId', citizenId.toString());
    formData.append('documentType', documentType);
    return this.http.post(`${this.baseUrl}/citizen/document/upload`, formData);
  }

  multiUploadDocuments(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/citizen/document/multi-upload`, formData);
  }

  getCitizenDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/citizen/document/list`);
  }

  // BirthCertificateController
  saveBirthCertificate(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/certificate/save`, data);
  }

  getPendingCertificateCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/certificate/pending-count`);
  }

  getTotalCertificateCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/certificate/count`);
  }

  downloadCertificate(referenceNumber: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/certificate/download/${referenceNumber}`, { responseType: 'blob' });
  }

  downloadBirthCertificateById(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/certificate/birth/${id}/download`, { responseType: 'blob' });
  }

  deleteCertificateById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/certificate/delete/${id}`);
  }
}
