import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipmentStoreService } from '../../equipments/equipment-store.service';
import { Equipment } from '../../equipments/equipment.model';
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
  readonly updateExerciseForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    primaryMuscles: new FormControl<Muscle[]>([]),
    secondaryMuscles: new FormControl<Muscle[]>([]),
    equipment: new FormControl<Equipment | null>(null)
  });
  exercise!: Exercise;
  muscles$: Observable<Muscle[]>;
  equipments$: Observable<Equipment[]>;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly equipmentStoreService: EquipmentStoreService,
    private readonly muscleStoreService: MuscleStoreService,
    private readonly exerciseStoreService: ExerciseStoreService,
    private readonly exerciseService: ExerciseService
  ) {
    this.muscles$ = this.muscleStoreService.muscles$;
    this.equipments$ = this.equipmentStoreService.equipments$;
  }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) this.exerciseService.getExercise(id).subscribe((exercise: Exercise) => {
      this.exercise = exercise;
      this.updateExerciseForm.setValue({
        name: this.exercise.name,
        primaryMuscles: this.exercise.primaryMuscles,
        secondaryMuscles: exercise.secondaryMuscles,
        equipment: exercise.equipment
      });
    });
  }

  onSubmit(): void {
    if (this.updateExerciseForm.invalid) return;

    console.log({
      ...this.updateExerciseForm.value,
      equipment: { id: this.updateExerciseForm.value.equipment },
    });

    this.exerciseStoreService.updateExercise({
      ...this.updateExerciseForm.value,
      id: this.exercise.id,
      equipment: { id: this.updateExerciseForm.value.equipment },
    }).subscribe({
      complete: () => {
        this.updateExerciseForm.reset();
        this.router.navigate(['exercises']);
      }
    });
  }
}
