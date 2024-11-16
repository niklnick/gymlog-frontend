import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Tab {
  readonly path: string;
  readonly label: string;
  readonly iconName: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  tabs: Tab[] = [
    { path: 'workouts', label: 'Workouts', iconName: 'list_alt' },
    { path: 'exercises', label: 'Exercises', iconName: 'exercise' }
  ];
}
