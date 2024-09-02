import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutSessionService {
  private apiUrl = 'https://localhost:7161/api/workoutsession';

  constructor(private http:HttpClient) { }

  getWorkoutSessions():Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getWorkoutSessionByType(type:string):Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ByType/${type}`);
  }

  getWorkoutSessionByMuscleGroup(muscleGroup:string):Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ByMuscleGroup/${muscleGroup}`);
  }

  chooseSession(id:number):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Choose/${id}`, {});
  }
}
