import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class AddExerciseComponent {
  readonly addExerciseForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    primaryMuscles: new FormControl([]),
    secondaryMuscles: new FormControl([]),
    equipment: new FormControl(null)
  });
  muscles$: Observable<Muscle[]>;
  equipments$: Observable<Equipment[]>;
  readonly queryForm: FormControl = new FormControl('');

  constructor(
    private readonly router: Router,
    private readonly equipmentStoreService: EquipmentStoreService,
    private readonly muscleStoreService: MuscleStoreService,
    private readonly exerciseStoreService: ExerciseStoreService
  ) {
    this.muscles$ = this.muscleStoreService.muscles$;
    this.equipments$ = this.equipmentStoreService.equipments$;
  }

  onSubmit(): void {
    if (this.addExerciseForm.invalid) return;

    this.exerciseStoreService.addExercise(this.addExerciseForm.value).subscribe({
      complete: () => this.router.navigate(['exercises'])
    });
  }

  searchMuscles(muscles: Muscle[], query: string): Muscle[] {
    return muscles.filter((muscle: Muscle) => {
      return muscle.name.toLowerCase().includes(query.toLowerCase());
    });
  }
}
