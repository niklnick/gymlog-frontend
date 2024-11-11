import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Equipment } from './equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private readonly apiUrl: string = environment.apiUrl + '/equipments'

  constructor(private readonly httpClient: HttpClient) { }

  getEquipments(): Observable<Equipment[]> {
    return this.httpClient.get<Equipment[]>(this.apiUrl);
  }

  getEquipment(id: string): Observable<Equipment> {
    return this.httpClient.get<Equipment>(`${this.apiUrl}/${id}`);
  }
}
