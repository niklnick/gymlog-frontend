import { Exercise } from "./exercise.model";

export interface WorkoutExercise {
    readonly exercise: Exercise;
    readonly sets: {
        readonly reps: number;
        readonly weightsKg: number;
    }[];
}
