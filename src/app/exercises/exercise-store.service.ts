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

  constructor(private readonly exerciseService: ExerciseService) {
    this.exerciseService.getExercises().subscribe((exercises: Exercise[]) => {
      this._exercises$.next(exercises);
    });
  }

  addExercise(exercise: Exercise): Observable<Exercise> {
    return this.exerciseService.addExercise(exercise).pipe(tap((exercise: Exercise) => {
      this._exercises$.next([...this._exercises$.getValue(), exercise].sort(
        (a: Exercise, b: Exercise) => a.name.localeCompare(b.name)
      ));
    }));
  }

  getExercise(id: string): Observable<Exercise> {
    return this.exerciseService.getExercise(id);
  }

  updateExercise(id: string, exercise: Exercise): Observable<Exercise> {
    return this.exerciseService.updateExercise(id, exercise).pipe(tap((exercise: Exercise) => {
      this._exercises$.next(this._exercises$.getValue().map(
        (e: Exercise) => e.id === exercise.id ? exercise : e
      ));
    }));
  }

  removeExercise(id: string): Observable<Exercise> {
    return this.exerciseService.removeExercise(id).pipe(tap(() => {
      this._exercises$.next(this._exercises$.getValue().filter(
        (exercise: Exercise) => exercise.id !== id
      ));
    }));
  }
}
