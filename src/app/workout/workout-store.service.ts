import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Workout } from './workout.model';
import { WorkoutService } from './workout.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutStoreService {
  private readonly _workouts$: BehaviorSubject<Workout[]> = new BehaviorSubject<Workout[]>([]);
  readonly workouts$: Observable<Workout[]> = this._workouts$.asObservable();

  constructor(private readonly workoutService: WorkoutService) {
    workoutService.getWorkouts().subscribe((workouts: Workout[]) => {
      this._workouts$.next(workouts);
    });
  }

  addWorkout(workout: Workout): Observable<Workout> {
    return this.workoutService.addWorkout(workout).pipe(tap((workout: Workout) => {
      this._workouts$.next([...this._workouts$.getValue(), workout]);
    }));
  }

  updateWorkout(id: string, workout: Workout): Observable<Workout> {
    return this.workoutService.updateWorkout(id, workout).pipe(tap((workout: Workout) => {
      this._workouts$.next(this._workouts$.getValue().map(
        (w: Workout) => w.id === workout.id ? workout : w
      ));
    }));
  }

  removeWorkout(id: string): Observable<Workout> {
    return this.workoutService.removeWorkout(id).pipe(tap(() => {
      this._workouts$.next(this._workouts$.getValue().filter(
        (workout: Workout) => workout.id !== id
      ));
    }));
  }
}
