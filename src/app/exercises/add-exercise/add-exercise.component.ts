import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Muscle } from '../../muscles/muscle.model';
import { MuscleService } from '../../muscles/muscle.service';
import { ExerciseStoreService } from '../exercise-store.service';

@Component({
  selector: 'app-add-exercise',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-exercise.component.html',
  styleUrl: './add-exercise.component.scss'
})
export class AddExerciseComponent implements OnInit {
  readonly addExerciseForm: FormGroup;
  muscles$: Observable<Muscle[]> = new Observable<Muscle[]>();

  constructor(
    private readonly muscleService: MuscleService,
    private readonly exerciseStoreService: ExerciseStoreService
  ) {
    this.addExerciseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      muscles: new FormControl([])
    });
  }

  ngOnInit(): void {
    this.muscles$ = this.muscleService.getMuscles();
  }

  onSubmit(): void {
    if (this.addExerciseForm.invalid) return;

    this.exerciseStoreService.addExercise(this.addExerciseForm.value);
    this.addExerciseForm.reset();
  }
}
