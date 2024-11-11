import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Equipment } from './equipment.model';
import { EquipmentService } from './equipment.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentStoreService {
  private readonly _equipments$: BehaviorSubject<Equipment[]> = new BehaviorSubject<Equipment[]>([]);
  readonly equipments$: Observable<Equipment[]> = this._equipments$.asObservable();

  constructor(private readonly equipmentService: EquipmentService) {
    this.equipmentService.getEquipments().subscribe((equipments: Equipment[]) => {
      this._equipments$.next(equipments);
    });
  }
}
