import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { SelectComponent } from './components/select/select.component';
import { MuscleStoreService } from './muscles/muscle-store.service';
import { Muscle } from './muscles/muscle.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, SelectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly muscles$: Observable<Muscle[]>;

  constructor(private readonly muscleStoreService: MuscleStoreService) {
    this.muscles$ = this.muscleStoreService.muscles$;
  }
}
