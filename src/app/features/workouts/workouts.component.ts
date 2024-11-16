import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EquipmentStoreService } from '../../services/equipment-store.service';
import { ExerciseStoreService } from '../../services/exercise-store.service';
import { MuscleStoreService } from '../../services/muscle-store.service';
import { WorkoutStoreService } from '../../services/workout-store.service';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss'
})
export class WorkoutsComponent {
  constructor(
    private readonly equipmentStoreService: EquipmentStoreService,
    private readonly exerciseStoreService: ExerciseStoreService,
    private readonly muscleStoreService: MuscleStoreService,
    private readonly workoutStoreService: WorkoutStoreService
  ) {
    this.equipmentStoreService.getEquipments().subscribe();
    this.exerciseStoreService.getExercises().subscribe();
    this.muscleStoreService.getMuscles().subscribe();
    this.workoutStoreService.getWorkouts().subscribe();
  }
}
