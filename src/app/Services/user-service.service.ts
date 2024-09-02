import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginViewModel } from '../Models/i-login-view-model';
import { Observable } from 'rxjs';
import { IUserRegister } from '../Models/i-user-register';
import { IUser } from '../Models/i-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7161/api/user'

  constructor(private http: HttpClient) { }

  login(loginData: ILoginViewModel):Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData, { withCredentials: true });
  }

  register(userData: IUserRegister): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/register`, userData, { withCredentials: true });
  }

  logout():Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  getProfile(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/profile`, { withCredentials: true });
  }

  getProgress():Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/progress`, { withCredentials: true });
  }
}
