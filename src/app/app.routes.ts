import { Routes } from '@angular/router';
import { AddExerciseComponent } from './exercises/add-exercise/add-exercise.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { UpdateExerciseComponent } from './exercises/update-exercise/update-exercise.component';
import { MusclesComponent } from './muscles/muscles.component';
import { WorkoutsComponent } from './workout/workouts/workouts.component';

export const routes: Routes = [
    { path: 'add-exercise', component: AddExerciseComponent },
    { path: 'update-exercise/:id', component: UpdateExerciseComponent },
    { path: 'exercises', component: ExercisesComponent },
    { path: 'muscles', component: MusclesComponent },
    { path: 'workouts', component: WorkoutsComponent }
];
