import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Muscle } from './muscle.model';

@Injectable({
  providedIn: 'root'
})
export class MuscleService {
  private readonly apiUrl: string = environment.apiUrl + '/muscles';

  constructor(private readonly httpClient: HttpClient) { }

  getMuscles(): Observable<Muscle[]> {
    return this.httpClient.get<Muscle[]>(this.apiUrl);
  }

  getMuscle(id: string): Observable<Muscle> {
    return this.httpClient.get<Muscle>(`${this.apiUrl}/${id}`);
  }
}
