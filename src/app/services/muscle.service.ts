import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Muscle } from '../models/muscle.model';

@Injectable({
  providedIn: 'root'
})
export class MuscleService {
  private readonly apiUrl: string = environment.apiUrl + '/muscles';

  constructor(private readonly httpClient: HttpClient) { }

  addMuscle(muscle: Omit<Muscle, 'id'>): Observable<Muscle> {
    return this.httpClient.post<Muscle>(this.apiUrl, muscle);
  }

  getMuscles(): Observable<Muscle[]> {
    return this.httpClient.get<Muscle[]>(this.apiUrl);
  }

  getMuscle(id: string): Observable<Muscle> {
    return this.httpClient.get<Muscle>(`${this.apiUrl}/${id}`);
  }

  updateMuscle(id: string, muscle: Partial<Omit<Muscle, 'id'>>): Observable<Muscle> {
    return this.httpClient.patch<Muscle>(`${this.apiUrl}/${id}`, muscle);
  }

  deleteMuscle(id: string): Observable<Muscle> {
    return this.httpClient.delete<Muscle>(`${this.apiUrl}/${id}`);
  }
}
