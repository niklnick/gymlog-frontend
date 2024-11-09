import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Muscle } from './muscle.model';
import { MuscleService } from './muscle.service';

@Injectable({
  providedIn: 'root'
})
export class MuscleStoreService {
  private readonly _muscles$: BehaviorSubject<Muscle[]> = new BehaviorSubject<Muscle[]>([]);
  readonly muscles$: Observable<Muscle[]> = this._muscles$.asObservable();

  constructor(private readonly muscleService: MuscleService) {
    this.muscleService.getMuscles().subscribe((muscles: Muscle[]) => {
      this._muscles$.next(muscles);
    });
  }
}
