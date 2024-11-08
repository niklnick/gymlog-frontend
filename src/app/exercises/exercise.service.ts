import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private readonly apiUrl: string = environment.apiUrl + '/exercises';

  constructor(private readonly httpClient: HttpClient) { }

  addExercise(exercise: Exercise): Observable<Exercise> {
    return this.httpClient.post<Exercise>(this.apiUrl, exercise);
  }

  getExercises(): Observable<Exercise[]> {
    return this.httpClient.get<Exercise[]>(this.apiUrl);
  }

  getExercise(id: string): Observable<Exercise> {
    return this.httpClient.get<Exercise>(`${this.apiUrl}/${id}`);
  }

  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.httpClient.patch<Exercise>(`${this.apiUrl}/${exercise.id}`, exercise);
  }

  removeExercise(id: string): Observable<Exercise> {
    return this.httpClient.delete<Exercise>(`${this.apiUrl}/${id}`);
  }
}
