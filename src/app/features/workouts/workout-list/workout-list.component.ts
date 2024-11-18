import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { WorkoutExercise } from '../../../models/workout-exercise.model';
import { Workout } from '../../../models/workout.model';
import { WorkoutStoreService } from '../../../services/workout-store.service';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.scss'
})
export class WorkoutListComponent {
  readonly workouts$: Observable<Workout[]>;

  constructor(private readonly workoutStoreService: WorkoutStoreService) {
    this.workouts$ = this.workoutStoreService.workouts$;
  }

  calculateAverage(workoutExercise: WorkoutExercise, setKey: keyof {
    readonly reps: number;
    readonly weightsKg: number;
  }): number {
    let sumReps: number = 0;
    workoutExercise.sets.forEach((set) => sumReps += set[setKey]);

    return Math.round(sumReps / workoutExercise.sets.length);
  }

  onDelete(id: string): void {
    this.workoutStoreService.deleteWorkout(id).subscribe();
  }
}
