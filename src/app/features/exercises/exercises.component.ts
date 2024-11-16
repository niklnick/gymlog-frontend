import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EquipmentStoreService } from '../../services/equipment-store.service';
import { ExerciseStoreService } from '../../services/exercise-store.service';
import { MuscleStoreService } from '../../services/muscle-store.service';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent {
  constructor(
    private readonly equipmentStoreService: EquipmentStoreService,
    private readonly exerciseStoreService: ExerciseStoreService,
    private readonly muscleStoreService: MuscleStoreService
  ) {
    this.equipmentStoreService.getEquipments().subscribe();
    this.exerciseStoreService.getExercises().subscribe();
    this.muscleStoreService.getMuscles().subscribe();
  }
}
