import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Equipment } from '../../../models/equipment.model';
import { Exercise } from '../../../models/exercise.model';
import { Muscle } from '../../../models/muscle.model';
import { EquipmentStoreService } from '../../../services/equipment-store.service';
import { ExerciseStoreService } from '../../../services/exercise-store.service';
import { MuscleStoreService } from '../../../services/muscle-store.service';

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
    equipment: new FormControl<string | null>(null)
  });
  readonly equipments$: Observable<Equipment[]>;
  readonly muscles$: Observable<Muscle[]>;
  private equipments: Equipment[] = [];
  private muscles: Muscle[] = [];

  constructor(
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
        (this.addExerciseForm.get('primaryMuscles') as FormArray).push(new FormControl(false));
        (this.addExerciseForm.get('secondaryMuscles') as FormArray).push(new FormControl(false));
      });
    });
  }

  onSubmit(): void {
    if (this.addExerciseForm.invalid) return;

    this.exerciseStoreService.addExercise({
      name: this.addExerciseForm.value.name,
      primaryMuscles: this.getSelectedMuscles('primaryMuscles'),
      secondaryMuscles: this.getSelectedMuscles('secondaryMuscles'),
      equipment: this.equipments.find((equipment: Equipment) => {
        return equipment.id === this.addExerciseForm.value.equipment;
      })
    } as Omit<Exercise, 'id'>).subscribe({
      complete: () => this.router.navigate(['exercises'])
    });
  }

  getSelectedMuscles(formArrayName: string): Muscle[] {
    return this.muscles.filter((_, index: number) => {
      return (this.addExerciseForm.get(formArrayName) as FormArray).at(index).value;
    });
  }
}
