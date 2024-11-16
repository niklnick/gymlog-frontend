import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Equipment } from '../models/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private readonly apiUrl: string = environment.apiUrl + '/equipments';

  constructor(private readonly httpClient: HttpClient) { }

  addEquipment(equipment: Omit<Equipment, 'id'>): Observable<Equipment> {
    return this.httpClient.post<Equipment>(this.apiUrl, equipment);
  }

  getEquipments(): Observable<Equipment[]> {
    return this.httpClient.get<Equipment[]>(this.apiUrl);
  }

  getEquipment(id: string): Observable<Equipment> {
    return this.httpClient.get<Equipment>(`${this.apiUrl}/${id}`);
  }

  updateEquipment(id: string, equipment: Partial<Omit<Equipment, 'id'>>): Observable<Equipment> {
    return this.httpClient.patch<Equipment>(`${this.apiUrl}/${id}`, equipment);
  }

  deleteEquipment(id: string): Observable<Equipment> {
    return this.httpClient.delete<Equipment>(`${this.apiUrl}/${id}`);
  }
}
