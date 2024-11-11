import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipmentStoreService } from '../../equipments/equipment-store.service';
import { Equipment } from '../../equipments/equipment.model';
import { MuscleStoreService } from '../../muscles/muscle-store.service';
import { Muscle } from '../../muscles/muscle.model';
import { ExerciseStoreService } from '../exercise-store.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-update-exercise',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-exercise.component.html',
  styleUrl: './update-exercise.component.scss'
})
export class UpdateExerciseComponent implements OnInit {
  readonly equipments$: Observable<Equipment[]>;
  readonly muscles$: Observable<Muscle[]>;
  muscles: Muscle[] = [];
  exerciseId: string | null = null;
  exercise!: Exercise;
  updateExerciseForm!: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly equipmentStoreService: EquipmentStoreService,
    private readonly muscleStoreService: MuscleStoreService,
    private readonly exerciseStoreService: ExerciseStoreService
  ) {
    this.equipments$ = this.equipmentStoreService.equipments$;
    this.muscles$ = this.muscleStoreService.muscles$;
  }

  ngOnInit(): void {
    this.muscles$.subscribe((muscles: Muscle[]) => {
      this.muscles = muscles;
      this.updateExerciseForm = new FormGroup({
        name: new FormControl<string>('', Validators.required),
        primaryMuscles: new FormArray(this.muscles.map(() => new FormControl(false))),
        secondaryMuscles: new FormArray(this.muscles.map(() => new FormControl(false))),
        equipment: new FormControl(null)
      });
    });

    this.exerciseId = this.route.snapshot.paramMap.get('id');
    if (this.exerciseId) {
      this.exerciseStoreService.getExercise(this.exerciseId).subscribe((exercise: Exercise) => {
        this.exercise = exercise;
        this.updateExerciseForm.setValue({
          name: this.exercise.name,
          primaryMuscles: this.muscles.map((muscle: Muscle) => {
            return this.exercise.primaryMuscles.some((m: Muscle) => m.id === muscle.id);
          }),
          secondaryMuscles: this.muscles.map((muscle: Muscle) => {
            return this.exercise.secondaryMuscles.some((m: Muscle) => m.id === muscle.id);
          }),
          equipment: exercise.equipment
        });
      });
    }
  }

  getSelectedMuscles(formArrayName: string): Muscle[] {
    return this.muscles.filter((_, i) => {
      return (this.updateExerciseForm.get(formArrayName) as FormArray).at(i).value;
    });
  }

  getFormArrayControls(formArrayName: string): FormControl[] {
    return (this.updateExerciseForm.get(formArrayName) as FormArray).controls as FormControl[];
  }

  formatSelectedMuscles(muscles: Muscle[]): string {
    return muscles.map((muscle: Muscle) => muscle.name).join(', ');
  }

  onSubmit(): void {
    if (!this.exerciseId || this.updateExerciseForm.invalid) return;

    this.exerciseStoreService.updateExercise(this.exerciseId, {
      name: this.updateExerciseForm.value.name,
      primaryMuscles: this.getSelectedMuscles('primaryMuscles'),
      secondaryMuscles: this.getSelectedMuscles('secondaryMuscles'),
      equipment: this.updateExerciseForm.value.equipment
    }).subscribe({
      complete: () => this.router.navigate(['exercises'])
    });
  }
}
