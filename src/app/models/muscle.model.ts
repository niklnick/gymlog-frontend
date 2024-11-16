import { Exercise } from "./exercise.model";

export interface Muscle {
    readonly id: string;
    readonly name: string;
    readonly primaryExercises?: Exercise[];
    readonly secondaryExercises?: Exercise[];
}
