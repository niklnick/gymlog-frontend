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

  formatWorkoutExercises(workoutExercises: WorkoutExercise[]): string {
    return workoutExercises.map((workoutExercise: WorkoutExercise) => {
      workoutExercise.exercise.name;
    }).join(', ');
  }
}
