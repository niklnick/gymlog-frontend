import { Routes } from '@angular/router';
import { ExercisesComponent } from './exercises/exercises.component';
import { MusclesComponent } from './muscles/muscles.component';

export const routes: Routes = [
    { path: 'exercises', component: ExercisesComponent },
    { path: 'muscles', component: MusclesComponent }
];
