import { Exercise } from "../exercises/exercise.model";
import { Workout } from "./workout.model";

export interface WorkoutExercise {
    readonly workoutId: string;
    readonly exerciseId: string;
    readonly position: number;
    readonly sets: {
        readonly reps: number;
        readonly weightsKg: number;
    };
    readonly workout: Workout;
    readonly exercise: Exercise;
}
