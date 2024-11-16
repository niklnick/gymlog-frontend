import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Workout } from '../models/workout.model';
import { WorkoutService } from './workout.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutStoreService {
  private readonly _workouts$: BehaviorSubject<Workout[]> = new BehaviorSubject<Workout[]>([]);
  readonly workouts$: Observable<Workout[]> = this._workouts$.asObservable();

  constructor(private readonly workoutService: WorkoutService) { }

  addWorkout(workout: Omit<Workout, 'id'>): Observable<Workout> {
    return this.workoutService.addWorkout(workout).pipe(tap((workout: Workout) => {
      this._workouts$.next([...this._workouts$.getValue(), workout]);
    }));
  }

  getWorkouts(): Observable<Workout[]> {
    return this.workoutService.getWorkouts().pipe(tap((workouts: Workout[]) => {
      this._workouts$.next(workouts);
    }));
  }

  getWorkout(id: string): Observable<Workout> {
    return this.workoutService.getWorkout(id).pipe(tap((workout: Workout) => {
      this._workouts$.next(this._workouts$.getValue().map((w: Workout) => {
        return w.id === workout.id ? workout : w;
      }));
    }));
  }

  updateWorkout(id: string, workout: Partial<Omit<Workout, 'id'>>): Observable<Workout> {
    return this.workoutService.updateWorkout(id, workout).pipe(tap((workout: Workout) => {
      this._workouts$.next(this._workouts$.getValue().map((w: Workout) => {
        return w.id === workout.id ? workout : w;
      }));
    }));
  }

  deleteWorkout(id: string): Observable<Workout> {
    return this.workoutService.deleteWorkout(id).pipe(tap(() => {
      this._workouts$.next(this._workouts$.getValue().filter((workout: Workout) => {
        return workout.id !== id;
      }));
    }));
  }
}
