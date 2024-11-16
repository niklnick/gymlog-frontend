import { Routes } from '@angular/router';
import { AddExerciseComponent } from './features/exercises/add-exercise/add-exercise.component';
import { ExerciseListComponent } from './features/exercises/exercise-list/exercise-list.component';
import { ExercisesComponent } from './features/exercises/exercises.component';
import { UpdateExerciseComponent } from './features/exercises/update-exercise/update-exercise.component';
import { AddWorkoutComponent } from './features/workouts/add-workout/add-workout.component';
import { WorkoutListComponent } from './features/workouts/workout-list/workout-list.component';
import { WorkoutsComponent } from './features/workouts/workouts.component';

export const routes: Routes = [
    {
        path: 'exercises',
        component: ExercisesComponent,
        children: [
            {
                path: '',
                component: ExerciseListComponent
            },
            {
                path: 'add-exercise',
                component: AddExerciseComponent
            },
            {
                path: 'update-exercise/:id',
                component: UpdateExerciseComponent
            }
        ]
    },
    {
        path: 'workouts',
        component: WorkoutsComponent,
        children: [
            {
                path: '',
                component: WorkoutListComponent
            },
            {
                path: 'add-workout',
                component: AddWorkoutComponent
            }
        ]
    }
];
