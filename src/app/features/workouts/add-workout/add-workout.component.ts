import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Exercise } from '../../../models/exercise.model';
import { ExerciseStoreService } from '../../../services/exercise-store.service';
import { WorkoutStoreService } from '../../../services/workout-store.service';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.scss'
})
export class AddWorkoutComponent {
  readonly addWorkoutFormGroup: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    workoutExercises: new FormArray<FormGroup>([])
  });
  readonly exercises$: Observable<Exercise[]>;
  exercises: Exercise[] = [];

  constructor(
    private readonly router: Router,
    private readonly exerciseStoreService: ExerciseStoreService,
    private readonly workoutStoreService: WorkoutStoreService
  ) {
    this.exercises$ = this.exerciseStoreService.exercises$;
  }

  get workoutExercisesFormArray(): FormArray<FormGroup> {
    return this.addWorkoutFormGroup.get('workoutExercises') as FormArray;
  }

  addWorkoutExercise(exercise: Exercise): void {
    this.workoutExercisesFormArray.push(new FormGroup({
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
    this.workoutExercisesFormArray.removeAt(index);
    this.exercises = this.exercises.filter((_, i: number) => i !== index);
  }

  getSetsFormArrayAt(index: number): FormArray<FormGroup> {
    return this.workoutExercisesFormArray.at(index).get('sets') as FormArray;
  }

  addSetAt(index: number): void {
    this.getSetsFormArrayAt(index).push(new FormGroup({
      reps: new FormControl<number>(0, Validators.required),
      weightsKg: new FormControl<number>(0, Validators.required)
    }));
  }

  removeSetAt(i: number, j: number): void {
    if (this.getSetsFormArrayAt(i).length <= 1) return;

    this.getSetsFormArrayAt(i).removeAt(j);
  }

  onReset(): void {
    this.addWorkoutFormGroup.reset();
    this.workoutExercisesFormArray.clear();
    this.exercises = [];
  }

  onSubmit(): void {
    if (this.addWorkoutFormGroup.invalid) return;

    this.workoutStoreService.addWorkout({
      name: this.addWorkoutFormGroup.value.name,
      workoutExercises: this.workoutExercisesFormArray.controls.map(
        (formGroup: FormGroup, index: number) => {
          return {
            exercise: this.exercises[index],
            sets: formGroup.value.sets
          };
        }
      )
    }).subscribe({ complete: () => this.router.navigate(['workouts']) });
  }
}
