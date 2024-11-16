import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Equipment } from '../models/equipment.model';
import { EquipmentService } from './equipment.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentStoreService {
  private readonly _equipments$: BehaviorSubject<Equipment[]> = new BehaviorSubject<Equipment[]>([]);
  readonly equipments$: Observable<Equipment[]> = this._equipments$.asObservable();

  constructor(private readonly equipmentService: EquipmentService) { }

  addEquipment(equipment: Omit<Equipment, 'id'>): Observable<Equipment> {
    return this.equipmentService.addEquipment(equipment).pipe(tap((equipment: Equipment) => {
      this._equipments$.next([...this._equipments$.getValue(), equipment]);
    }));
  }

  getEquipments(): Observable<Equipment[]> {
    return this.equipmentService.getEquipments().pipe(tap((equipments: Equipment[]) => {
      this._equipments$.next(equipments);
    }));
  }

  getEquipment(id: string): Observable<Equipment> {
    return this.equipmentService.getEquipment(id).pipe(tap((equipment: Equipment) => {
      this._equipments$.next(this._equipments$.getValue().map((w: Equipment) => {
        return w.id === equipment.id ? equipment : w;
      }));
    }));
  }

  updateEquipment(id: string, equipment: Partial<Omit<Equipment, 'id'>>): Observable<Equipment> {
    return this.equipmentService.updateEquipment(id, equipment).pipe(tap((equipment: Equipment) => {
      this._equipments$.next(this._equipments$.getValue().map((w: Equipment) => {
        return w.id === equipment.id ? equipment : w;
      }));
    }));
  }

  deleteEquipment(id: string): Observable<Equipment> {
    return this.equipmentService.deleteEquipment(id).pipe(tap(() => {
      this._equipments$.next(this._equipments$.getValue().filter((equipment: Equipment) => {
        return equipment.id !== id;
      }));
    }));
  }
}
