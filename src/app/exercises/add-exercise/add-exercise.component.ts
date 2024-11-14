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
  readonly addExerciseForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    primaryMuscles: new FormArray<FormControl<boolean>>([]),
    secondaryMuscles: new FormArray<FormControl<boolean>>([]),
    equipment: new FormControl<Equipment | null>(null)
  });
  readonly equipments$: Observable<Equipment[]>;
  readonly muscles$: Observable<Muscle[]>;
  muscles: Muscle[] = [];

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
    const primaryMusclesForm = this.getFormArrayControls('primaryMuscles');
    const secondaryMusclesForm = this.getFormArrayControls('secondaryMuscles');
    this.muscles$.subscribe((muscles: Muscle[]) => {
      this.muscles = muscles;
      this.muscles.forEach(() => {
        primaryMusclesForm.push(new FormControl(false));
        secondaryMusclesForm.push(new FormControl(false));
      });
    });
  }

  onSubmit(): void {
    if (this.addExerciseForm.invalid) return;

    this.exerciseStoreService.addExercise({
      name: this.addExerciseForm.value.name,
      primaryMuscles: this.getSelectedMuscles('primaryMuscles'),
      secondaryMuscles: this.getSelectedMuscles('secondaryMuscles'),
      equipment: this.addExerciseForm.value.equipment
    }).subscribe({ complete: () => this.router.navigate(['exercises']) });
  }

  getFormArrayControls(formArrayName: string): FormControl[] {
    return (this.addExerciseForm.get(formArrayName) as FormArray<FormControl>).controls;
  }

  getSelectedMuscles(formArrayName: string): Muscle[] {
    return this.muscles.filter((_, i) => {
      return (this.addExerciseForm.get(formArrayName) as FormArray).at(i).value;
    });
  }

  formatSelectedMuscles(muscles: Muscle[]): string {
    return muscles.map((muscle: Muscle) => muscle.name).join(', ');
  }
}
