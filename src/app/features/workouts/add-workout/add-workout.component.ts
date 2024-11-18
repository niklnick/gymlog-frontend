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
    workoutExercises: new FormArray<FormGroup>([])
  });
  readonly exercises$: Observable<Exercise[]>;
  exercises: Exercise[] = [];

  constructor(private readonly exerciseStoreService: ExerciseStoreService) {
    this.exercises$ = this.exerciseStoreService.exercises$;
  }

  get workoutExercises(): FormGroup[] {
    return (this.addWorkoutForm.get('workoutExercises') as FormArray<FormGroup>).controls;
  }

  getWorkoutExerciseSetsAt(index: number): FormGroup[] {
    return (this.workoutExercises[index].get('sets') as FormArray<FormGroup>).controls;
  }

  addWorkoutExercise(exercise: Exercise): void {
    this.workoutExercises.push(new FormGroup({
      sets: new FormArray<FormGroup>([
        new FormGroup({
          reps: new FormControl<number>(0, Validators.required),
          weightsKg: new FormControl<number>(0, Validators.required)
        })
      ])
    }));
    this.exercises.push(exercise);
  }

  removeWorkoutExerciseAt(index: number): void {
    (this.addWorkoutForm.get('workoutExercises') as FormArray).removeAt(index);
    this.exercises = this.exercises.filter((_, i: number) => i !== index);
  }
}
