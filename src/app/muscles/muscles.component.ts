import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Muscle } from './muscle.model';
import { MuscleService } from './muscle.service';

@Component({
  selector: 'app-muscles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './muscles.component.html',
  styleUrl: './muscles.component.scss'
})
export class MusclesComponent implements OnInit {
  muscles$: Observable<Muscle[]> = new Observable<Muscle[]>();

  constructor(private readonly muscleService: MuscleService) { }

  ngOnInit(): void {
    this.muscles$ = this.muscleService.getMuscles();
  }
}
