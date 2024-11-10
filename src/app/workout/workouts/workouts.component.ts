import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { WorkoutExercise } from '../workout-exercise.model';
import { WorkoutStoreService } from '../workout-store.service';
import { Workout } from '../workout.model';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss'
})
export class WorkoutsComponent {
  readonly workouts$: Observable<Workout[]>;

  constructor(private readonly workoutStoreService: WorkoutStoreService) {
    this.workouts$ = this.workoutStoreService.workouts$;
  }

  formatWorkoutExercises(workoutExercises: WorkoutExercise[]): string {
    return workoutExercises.map((workoutExercise: WorkoutExercise) => {
      return workoutExercise.exercise.name;
    }).join(', ');
  }

  onDelete(id: string): void {
    this.workoutStoreService.removeWorkout(id).subscribe();
  }
}
