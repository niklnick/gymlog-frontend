import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Muscle } from '../muscles/muscle.model';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { ExerciseStoreService } from './exercise-store.service';
import { Exercise } from './exercise.model';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, AddExerciseComponent],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent implements OnInit {
  exercises$: Observable<Exercise[]>;

  constructor(private readonly exerciseStoreService: ExerciseStoreService) {
    this.exercises$ = this.exerciseStoreService.exercises$;
  }

  ngOnInit(): void {
    this.exerciseStoreService.fetchExercises();
  }

  formatMuscles(muscles: Muscle[]): string {
    return muscles.map(muscle => muscle.name).join(', ');
  }

  onDelete(id: string): void {
    this.exerciseStoreService.removeExercise(id);
  }
}
