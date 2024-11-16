import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Exercise } from '../../../models/exercise.model';
import { ExerciseStoreService } from '../../../services/exercise-store.service';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.scss'
})
export class AddWorkoutComponent {
  readonly addWorkoutForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    workoutExercises: new FormArray<typeof this.workoutExerciseForm>([])
  });
  readonly workoutExerciseForm: FormGroup = new FormGroup({
    exercise: new FormControl<string>('', Validators.required),
    sets: new FormControl(null, Validators.required)
  });
  readonly exercises$: Observable<Exercise[]>;

  constructor(private readonly exerciseStoreService: ExerciseStoreService) {
    this.exercises$ = this.exerciseStoreService.exercises$;
  }

  addWorkoutExercise(): void {
    (this.addWorkoutForm.get('workoutExercises') as FormArray).push(this.workoutExerciseForm);
  }
}
