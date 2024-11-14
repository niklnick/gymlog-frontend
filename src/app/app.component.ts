import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Tab {
  readonly iconName: string;
  readonly label: string;
  readonly path: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly tabs: Tab[] = [
    { iconName: 'cadence', label: 'Workouts', path: 'workouts' },
    { iconName: 'exercise', label: 'Exercises', path: 'exercises' }
  ];
}
