import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Muscle } from '../models/muscle.model';
import { MuscleService } from './muscle.service';

@Injectable({
  providedIn: 'root'
})
export class MuscleStoreService {
  private readonly _muscles$: BehaviorSubject<Muscle[]> = new BehaviorSubject<Muscle[]>([]);
  readonly muscles$: Observable<Muscle[]> = this._muscles$.asObservable();

  constructor(private readonly muscleService: MuscleService) { }

  addMuscle(muscle: Omit<Muscle, 'id'>): Observable<Muscle> {
    return this.muscleService.addMuscle(muscle).pipe(tap((muscle: Muscle) => {
      this._muscles$.next([...this._muscles$.getValue(), muscle]);
    }));
  }

  getMuscles(): Observable<Muscle[]> {
    return this.muscleService.getMuscles().pipe(tap((muscles: Muscle[]) => {
      this._muscles$.next(muscles);
    }));
  }

  getMuscle(id: string): Observable<Muscle> {
    return this.muscleService.getMuscle(id).pipe(tap((muscle: Muscle) => {
      this._muscles$.next(this._muscles$.getValue().map((w: Muscle) => {
        return w.id === muscle.id ? muscle : w;
      }));
    }));
  }

  updateMuscle(id: string, muscle: Partial<Omit<Muscle, 'id'>>): Observable<Muscle> {
    return this.muscleService.updateMuscle(id, muscle).pipe(tap((muscle: Muscle) => {
      this._muscles$.next(this._muscles$.getValue().map((w: Muscle) => {
        return w.id === muscle.id ? muscle : w;
      }));
    }));
  }

  deleteMuscle(id: string): Observable<Muscle> {
    return this.muscleService.deleteMuscle(id).pipe(tap(() => {
      this._muscles$.next(this._muscles$.getValue().filter((muscle: Muscle) => {
        return muscle.id !== id;
      }));
    }));
  }
}
