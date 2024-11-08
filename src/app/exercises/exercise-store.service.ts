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

  addExercise(exercise: Exercise): void {
    this.exerciseService.addExercise(exercise).pipe(
      tap((exercise: Exercise) => this._exercises$.next([...this._exercises$.getValue(), exercise].sort(
        (a: Exercise, b: Exercise) => a.name.localeCompare(b.name)
      )))
    ).subscribe();
  }

  updateExercise(exercise: Exercise): void {
    this.exerciseService.updateExercise(exercise).pipe(
      tap((exercise: Exercise) => this._exercises$.next(this._exercises$.getValue().map(
        (e: Exercise) => e.id === exercise.id ? exercise : e
      )))
    ).subscribe();
  }

  removeExercise(id: string): void {
    this.exerciseService.removeExercise(id).pipe(
      tap(() => this._exercises$.next(this._exercises$.getValue().filter(
        (exercise: Exercise) => exercise.id !== id
      )))
    ).subscribe();
  }
}
