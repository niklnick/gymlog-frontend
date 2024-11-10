import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ExerciseStoreService } from '../../exercises/exercise-store.service';
import { Exercise } from '../../exercises/exercise.model';
import { WorkoutStoreService } from '../workout-store.service';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.scss'
})
export class AddWorkoutComponent {
  readonly addWorkoutForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    workoutExercises: new FormControl([])
  });
  exercises$: Observable<Exercise[]>;

  constructor(
    private readonly router: Router,
    private readonly exerciseStoreService: ExerciseStoreService,
    private readonly workoutStoreService: WorkoutStoreService
  ) {
    this.exercises$ = this.exerciseStoreService.exercises$;
  }

  onSubmit(): void {
    if (this.addWorkoutForm.invalid) return;

    this.workoutStoreService.addWorkout(this.addWorkoutForm.value).subscribe({
      complete: () => this.router.navigate(['workouts'])
    });
  }
}
