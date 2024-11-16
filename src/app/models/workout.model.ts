import { WorkoutExercise } from "./workout-exercise.model";

export interface Workout {
    readonly id: string;
    readonly name: string;
    readonly workoutExercises: WorkoutExercise[];
}
