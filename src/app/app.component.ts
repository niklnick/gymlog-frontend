import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { MuscleStoreService } from './muscles/muscle-store.service';
import { Muscle } from './muscles/muscle.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DropdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly muscles$: Observable<Muscle[]>;

  constructor(private readonly muscleStoreService: MuscleStoreService) {
    this.muscles$ = this.muscleStoreService.muscles$;
  }
}
