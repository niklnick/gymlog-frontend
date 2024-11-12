import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipmentStoreService } from '../../equipments/equipment-store.service';
import { Equipment } from '../../equipments/equipment.model';
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
export class AddExerciseComponent implements OnInit {
  readonly equipments$: Observable<Equipment[]>;
  readonly muscles$: Observable<Muscle[]>;
  muscles!: Muscle[];
  addExerciseForm!: FormGroup;

  constructor(
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
      this.addExerciseForm = new FormGroup({
        name: new FormControl('', Validators.required),
        primaryMuscles: new FormArray(this.muscles.map(() => new FormControl(false))),
        secondaryMuscles: new FormArray(this.muscles.map(() => new FormControl(false))),
        equipment: new FormControl(null)
      });
    });
  }

  getSelectedMuscles(formArrayName: string): Muscle[] {
    return this.muscles.filter((_, i) => {
      return (this.addExerciseForm.get(formArrayName) as FormArray).at(i).value;
    });
  }

  getFormArrayControls(formArrayName: string): FormControl[] {
    return (this.addExerciseForm.get(formArrayName) as FormArray).controls as FormControl[];
  }

  formatSelectedMuscles(muscles: Muscle[]): string {
    return muscles.map((muscle: Muscle) => muscle.name).join(', ');
  }

  onSubmit(): void {
    if (this.addExerciseForm.invalid) return;

    this.exerciseStoreService.addExercise({
      name: this.addExerciseForm.value.name,
      primaryMuscles: this.getSelectedMuscles('primaryMuscles'),
      secondaryMuscles: this.getSelectedMuscles('secondaryMuscles'),
      equipment: this.addExerciseForm.value.equipment
    }).subscribe({
      complete: () => this.router.navigate(['exercises'])
    });
  }
}
