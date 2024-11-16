import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private readonly apiUrl: string = environment.apiUrl + '/exercises';

  constructor(private readonly httpClient: HttpClient) { }

  addExercise(exercise: Omit<Exercise, 'id'>): Observable<Exercise> {
    return this.httpClient.post<Exercise>(this.apiUrl, exercise);
  }

  getExercises(): Observable<Exercise[]> {
    return this.httpClient.get<Exercise[]>(this.apiUrl);
  }

  getExercise(id: string): Observable<Exercise> {
    return this.httpClient.get<Exercise>(`${this.apiUrl}/${id}`);
  }

  updateExercise(id: string, exercise: Partial<Omit<Exercise, 'id'>>): Observable<Exercise> {
    return this.httpClient.patch<Exercise>(`${this.apiUrl}/${id}`, exercise);
  }

  deleteExercise(id: string): Observable<Exercise> {
    return this.httpClient.delete<Exercise>(`${this.apiUrl}/${id}`);
  }
}
