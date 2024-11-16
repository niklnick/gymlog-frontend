import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private readonly apiUrl: string = environment.apiUrl + '/workouts';

  constructor(private readonly httpClient: HttpClient) { }

  addWorkout(workout: Omit<Workout, 'id'>): Observable<Workout> {
    return this.httpClient.post<Workout>(this.apiUrl, workout);
  }

  getWorkouts(): Observable<Workout[]> {
    return this.httpClient.get<Workout[]>(this.apiUrl);
  }

  getWorkout(id: string): Observable<Workout> {
    return this.httpClient.get<Workout>(`${this.apiUrl}/${id}`);
  }

  updateWorkout(id: string, workout: Partial<Omit<Workout, 'id'>>): Observable<Workout> {
    return this.httpClient.patch<Workout>(`${this.apiUrl}/${id}`, workout);
  }

  deleteWorkout(id: string): Observable<Workout> {
    return this.httpClient.delete<Workout>(`${this.apiUrl}/${id}`);
  }
}
