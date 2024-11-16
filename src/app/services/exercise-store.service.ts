import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import { ExerciseService } from './exercise.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseStoreService {
  private readonly _exercises$: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>([]);
  readonly exercises$: Observable<Exercise[]> = this._exercises$.asObservable();

  constructor(private readonly exerciseService: ExerciseService) { }

  addExercise(exercise: Omit<Exercise, 'id'>): Observable<Exercise> {
    return this.exerciseService.addExercise(exercise).pipe(tap((exercise: Exercise) => {
      this._exercises$.next([...this._exercises$.getValue(), exercise].sort((a: Exercise, b: Exercise) => {
        return a.name.localeCompare(b.name);
      }));
    }));
  }

  getExercises(): Observable<Exercise[]> {
    return this.exerciseService.getExercises().pipe(tap((exercises: Exercise[]) => {
      this._exercises$.next(exercises);
    }));
  }

  getExercise(id: string): Observable<Exercise> {
    return this.exerciseService.getExercise(id).pipe(tap((exercise: Exercise) => {
      this._exercises$.next(this._exercises$.getValue().map((w: Exercise) => {
        return w.id === exercise.id ? exercise : w;
      }));
    }));
  }

  updateExercise(id: string, exercise: Partial<Omit<Exercise, 'id'>>): Observable<Exercise> {
    return this.exerciseService.updateExercise(id, exercise).pipe(tap((exercise: Exercise) => {
      this._exercises$.next(this._exercises$.getValue().map((w: Exercise) => {
        return w.id === exercise.id ? exercise : w;
      }).sort((a: Exercise, b: Exercise) => {
        return a.name.localeCompare(b.name);
      }));
    }));
  }

  deleteExercise(id: string): Observable<Exercise> {
    return this.exerciseService.deleteExercise(id).pipe(tap(() => {
      this._exercises$.next(this._exercises$.getValue().filter((exercise: Exercise) => {
        return exercise.id !== id;
      }));
    }));
  }
}
