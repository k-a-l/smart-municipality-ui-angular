import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080/api/v1/user';
  // Check if email exists
  checkEmailExists(email: string) {
    return this.http.get<boolean>(`${this.baseUrl}/check?email=${email}`);
  }
  //find user by email
  findUserByEmail(email: string | null) {
    return this.http.get<any>(`${this.baseUrl}/by-email?email=${email}`);
  }



}
