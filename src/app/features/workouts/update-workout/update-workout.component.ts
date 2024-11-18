import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Exercise } from '../../../models/exercise.model';
import { WorkoutExercise } from '../../../models/workout-exercise.model';
import { Workout } from '../../../models/workout.model';
import { ExerciseStoreService } from '../../../services/exercise-store.service';
import { WorkoutStoreService } from '../../../services/workout-store.service';

@Component({
  selector: 'app-update-workout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-workout.component.html',
  styleUrl: './update-workout.component.scss'
})
export class UpdateWorkoutComponent implements OnInit {
  readonly updateWorkoutFormGroup: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    workoutExercises: new FormArray<FormGroup>([])
  });
  readonly exercises$: Observable<Exercise[]>;
  exercises: Exercise[] = [];
  workout: Workout | null = null;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly exerciseStoreService: ExerciseStoreService,
    private readonly workoutStoreService: WorkoutStoreService
  ) {
    this.exercises$ = this.exerciseStoreService.exercises$;
  }

  ngOnInit(): void {
    const workoutId: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    if (!workoutId) return;

    this.workoutStoreService.getWorkout(workoutId).subscribe((workout: Workout) => {
      this.workout = workout;
      this.exercises = this.workout.workoutExercises.map((workoutExercise: WorkoutExercise) => {
        return workoutExercise.exercise;
      });
      this.updateWorkoutFormGroup.patchValue({ name: this.workout.name });
      this.workout.workoutExercises.forEach((workoutExercise: WorkoutExercise) => {
        (this.updateWorkoutFormGroup.get('workoutExercises') as FormArray).push(new FormGroup({
          sets: new FormArray(workoutExercise.sets.map((set) => {
            return new FormGroup({
              reps: new FormControl(set.reps, Validators.required),
              weightsKg: new FormControl(set.weightsKg, Validators.required)
            });
          }))
        }));
      });
    });
  }

  get workoutExercisesFormArray(): FormArray<FormGroup> {
    return this.updateWorkoutFormGroup.get('workoutExercises') as FormArray;
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
    this.updateWorkoutFormGroup.reset();
    this.workoutExercisesFormArray.clear();
    this.exercises = [];
  }

  onSubmit(): void {
    if (this.updateWorkoutFormGroup.invalid || !this.workout) return;

    this.workoutStoreService.updateWorkout(this.workout.id, {
      name: this.updateWorkoutFormGroup.value.name,
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
