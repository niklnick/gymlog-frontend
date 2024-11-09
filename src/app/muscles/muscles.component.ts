import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MuscleStoreService } from './muscle-store.service';
import { Muscle } from './muscle.model';

@Component({
  selector: 'app-muscles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './muscles.component.html',
  styleUrl: './muscles.component.scss'
})
export class MusclesComponent {
  readonly muscles$: Observable<Muscle[]>;

  constructor(private readonly muscleStoreService: MuscleStoreService) {
    this.muscles$ = this.muscleStoreService.muscles$;
  }
}
