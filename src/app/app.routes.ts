import { Routes } from '@angular/router';
import { AddExerciseComponent } from './exercises/add-exercise/add-exercise.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { MusclesComponent } from './muscles/muscles.component';

export const routes: Routes = [
    { path: 'add-exercise', component: AddExerciseComponent },
    { path: 'exercises', component: ExercisesComponent },
    { path: 'muscles', component: MusclesComponent }
];
