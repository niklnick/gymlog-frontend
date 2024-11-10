import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MuscleStoreService } from '../../muscles/muscle-store.service';
import { Muscle } from '../../muscles/muscle.model';
import { ExerciseStoreService } from '../exercise-store.service';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-update-exercise',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-exercise.component.html',
  styleUrl: './update-exercise.component.scss'
})
export class UpdateExerciseComponent implements OnInit {
  readonly updateExerciseForm!: FormGroup;
  exercise!: Exercise;
  muscles$: Observable<Muscle[]>;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly muscleStoreService: MuscleStoreService,
    private readonly exerciseStoreService: ExerciseStoreService,
    private readonly exerciseService: ExerciseService
  ) {
    this.updateExerciseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      primaryMuscles: new FormControl([]),
      secondaryMuscles: new FormControl([])
    });
    this.muscles$ = this.muscleStoreService.muscles$;
  }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) this.exerciseService.getExercise(id).subscribe((exercise: Exercise) => {
      this.exercise = exercise;
      this.updateExerciseForm.setValue({
        name: this.exercise.name,
        primaryMuscles: this.exercise.primaryMuscles,
        secondaryMuscles: exercise.secondaryMuscles
      });
    });
  }

  onSubmit(): void {
    if (this.updateExerciseForm.invalid) return;

    this.exerciseStoreService.updateExercise({
      id: this.exercise.id, ...this.updateExerciseForm.value
    }).subscribe({
      complete: () => {
        this.updateExerciseForm.reset();
        this.router.navigate(['exercises']);
      }
    });
  }
}
