import { Exercise } from "./exercise.model";
import { Workout } from "./workout.model";

export interface WorkoutExercise {
    readonly workout: Workout;
    readonly exercise: Exercise;
    readonly sets: {
        readonly reps: number;
        readonly weightsKg: number;
    }[];
}
