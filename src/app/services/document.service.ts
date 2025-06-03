import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080/api/v1/citizen/document';

  //getByCitizenId(citizenId: number)

  getCitizenDocumentByCitizenId(citizenId: number) {
    return this.http.get(`${this.baseUrl}/documentByCitizenId/${citizenId}`);
  }

}
