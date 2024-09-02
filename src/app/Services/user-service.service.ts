import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginViewModel } from '../Models/i-login-view-model';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { IUserRegister } from '../Models/i-user-register';
import { IUser } from '../Models/i-user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7161/api/user'
  loginData: ILoginViewModel = {
    email: '',
    password: ''
  }
  private authSubject = new BehaviorSubject<IUser | null>(null);

  syncIsLoggedIn:boolean = false;

  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(
    map(user => !!user),
    tap(isLoggedIn => this.syncIsLoggedIn = isLoggedIn)
  );

  constructor(private http: HttpClient, private router:Router) { }

  login(loginData: ILoginViewModel): Observable<any> {
    return this.http.post<IUser>(`${this.apiUrl}/login`, loginData, { withCredentials: true }).pipe(
      tap(user => {
        if (user) {
          this.authSubject.next(user);
          this.router.navigate(['/profile']);
        }
      })
    );
  }

  register(userData: IUserRegister): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/register`, userData, { withCredentials: true }).pipe(
      tap(user => this.authSubject.next(user))
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.authSubject.next(null);
        this.router.navigate(['/first-page']);
      })
    );
  }

  getProfile(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/profile`, { withCredentials: true });
  }

  getProgress():Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/progress`, { withCredentials: true });
  }
}
