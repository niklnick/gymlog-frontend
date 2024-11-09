import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Muscle } from '../muscles/muscle.model';
import { ExerciseStoreService } from './exercise-store.service';
import { Exercise } from './exercise.model';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent {
  readonly exercises$: Observable<Exercise[]>;

  constructor(private readonly exerciseStoreService: ExerciseStoreService) {
    this.exercises$ = this.exerciseStoreService.exercises$;
  }

  formatMuscles(muscles: Muscle[]): string {
    return muscles.map((muscle: Muscle) => muscle.name).join(', ');
  }

  onDelete(id: string): void {
    this.exerciseStoreService.removeExercise(id).subscribe();
  }
}
