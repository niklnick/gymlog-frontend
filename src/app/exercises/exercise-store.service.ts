import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Exercise } from './exercise.model';
import { ExerciseService } from './exercise.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseStoreService {
  private readonly _exercises$: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>([]);
  readonly exercises$: Observable<Exercise[]> = this._exercises$.asObservable();

  constructor(private readonly exerciseService: ExerciseService) { }

  fetchExercises(): void {
    this.exerciseService.getExercises().pipe(
      tap((exercises: Exercise[]) => this._exercises$.next(exercises))
    ).subscribe();
  }

  get exercises(): Exercise[] {
    return this._exercises$.getValue();
  }
}
