import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Workout } from './workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private readonly apiUrl: string = environment.apiUrl + '/workouts';

  constructor(private readonly httpClient: HttpClient) { }

  addWorkout(workout: Workout): Observable<Workout> {
    return this.httpClient.post<Workout>(this.apiUrl, workout);
  }

  getWorkouts(): Observable<Workout[]> {
    return this.httpClient.get<Workout[]>(this.apiUrl);
  }

  getWorkout(id: string): Observable<Workout> {
    return this.httpClient.get<Workout>(`${this.apiUrl}/${id}`);
  }

  updateWorkout(id: string, workout: Workout): Observable<Workout> {
    return this.httpClient.patch<Workout>(`${this.apiUrl}/${id}`, workout);
  }

  removeWorkout(id: string): Observable<Workout> {
    return this.httpClient.delete<Workout>(`${this.apiUrl}/${id}`);
  }
}
