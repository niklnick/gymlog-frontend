import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Muscle } from '../muscles/muscle.model';
import { Exercise } from './exercise.model';
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent implements OnInit {
  exercises$: Observable<Exercise[]> = new Observable<Exercise[]>();

  constructor(private readonly exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.exercises$ = this.exerciseService.getExercises();
  }

  formatMuscles(muscles: Muscle[]): string {
    return muscles.map(muscle => muscle.name).join(', ');
  }
}
