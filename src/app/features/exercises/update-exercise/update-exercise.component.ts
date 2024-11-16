import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Equipment } from '../../../models/equipment.model';
import { Exercise } from '../../../models/exercise.model';
import { Muscle } from '../../../models/muscle.model';
import { EquipmentStoreService } from '../../../services/equipment-store.service';
import { ExerciseStoreService } from '../../../services/exercise-store.service';
import { MuscleStoreService } from '../../../services/muscle-store.service';

@Component({
  selector: 'app-update-exercise',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-exercise.component.html',
  styleUrl: './update-exercise.component.scss'
})
export class UpdateExerciseComponent implements OnInit {
  readonly updateExerciseForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    primaryMuscles: new FormArray<FormControl<boolean>>([]),
    secondaryMuscles: new FormArray<FormControl<boolean>>([]),
    equipment: new FormControl<string | null>(null)
  });
  readonly equipments$: Observable<Equipment[]>;
  readonly muscles$: Observable<Muscle[]>;
  private equipments: Equipment[] = [];
  private exercise: Exercise | null = null;
  private muscles: Muscle[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly equipmentStoreService: EquipmentStoreService,
    private readonly exerciseStoreService: ExerciseStoreService,
    private readonly muscleStoreService: MuscleStoreService
  ) {
    this.equipments$ = this.equipmentStoreService.equipments$;
    this.muscles$ = this.muscleStoreService.muscles$;
  }

  ngOnInit(): void {
    this.equipments$.subscribe((equipments: Equipment[]) => this.equipments = equipments);
    this.muscles$.subscribe((muscles: Muscle[]) => {
      this.muscles = muscles;
      this.muscles.forEach(() => {
        (this.updateExerciseForm.get('primaryMuscles') as FormArray).push(new FormControl(false));
        (this.updateExerciseForm.get('secondaryMuscles') as FormArray).push(new FormControl(false));
      });
    });

    const exerciseId: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    if (!exerciseId) return;

    this.exerciseStoreService.getExercise(exerciseId).subscribe((exercise: Exercise) => {
      this.exercise = exercise;
      this.updateExerciseForm.setValue({
        name: this.exercise.name,
        primaryMuscles: this.muscles.map((muscle: Muscle) => {
          return exercise.primaryMuscles.some((m: Muscle) => m.id === muscle.id)
        }),
        secondaryMuscles: this.muscles.map((muscle: Muscle) => {
          return exercise.secondaryMuscles.some((m: Muscle) => m.id === muscle.id)
        }),
        equipment: this.exercise.equipment?.id ?? null
      });
    });
  }

  onSubmit(): void {
    if (this.updateExerciseForm.invalid || !this.exercise) return;

    this.exerciseStoreService.updateExercise(this.exercise.id, {
      name: this.updateExerciseForm.value.name,
      primaryMuscles: this.getSelectedMuscles('primaryMuscles'),
      secondaryMuscles: this.getSelectedMuscles('secondaryMuscles'),
      equipment: this.equipments.find((equipment: Equipment) => {
        return equipment.id === this.updateExerciseForm.value.equipment;
      })
    } as Omit<Exercise, 'id'>).subscribe({
      complete: () => this.router.navigate(['exercises'])
    });
  }

  getSelectedMuscles(formArrayName: string): Muscle[] {
    return this.muscles.filter((_, index: number) => {
      return (this.updateExerciseForm.get(formArrayName) as FormArray).at(index).value;
    });
  }
}
