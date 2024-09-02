import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWorkoutSession } from '../Models/i-workout-session';

@Injectable({
  providedIn: 'root'
})
export class WorkoutSessionService {
  private apiUrl = 'https://localhost:7161/api/workoutsession';

  constructor(private http:HttpClient) { }

  getWorkoutSessions():Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`, { withCredentials: true });
  }

  getWorkoutSessionById(id: number): Observable<IWorkoutSession> {
    return this.http.get<IWorkoutSession>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  getWorkoutSessionByType(type:string):Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ByType/${type}`, { withCredentials: true });
  }

  getWorkoutSessionByMuscleGroup(muscleGroup:string):Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ByMuscleGroup/${muscleGroup}`, { withCredentials: true });
  }

  chooseSession(id:number):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Choose/${id}`, {}, { withCredentials: true });
  }
}
