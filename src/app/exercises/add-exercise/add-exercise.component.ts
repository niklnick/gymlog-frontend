import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MuscleStoreService } from '../../muscles/muscle-store.service';
import { Muscle } from '../../muscles/muscle.model';
import { ExerciseStoreService } from '../exercise-store.service';

@Component({
  selector: 'app-add-exercise',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-exercise.component.html',
  styleUrl: './add-exercise.component.scss'
})
export class AddExerciseComponent {
  readonly addExerciseForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    primaryMuscles: new FormControl([]),
    secondaryMuscles: new FormControl([])
  });
  muscles$: Observable<Muscle[]>;

  constructor(
    private readonly router: Router,
    private readonly muscleStoreService: MuscleStoreService,
    private readonly exerciseStoreService: ExerciseStoreService
  ) {
    this.muscles$ = this.muscleStoreService.muscles$;
  }

  onSubmit(): void {
    if (this.addExerciseForm.invalid) return;

    this.exerciseStoreService.addExercise(this.addExerciseForm.value).subscribe({
      complete: () => this.router.navigate(['exercises'])
    });
  }
}
