import { Exercise } from "../exercises/exercise.model";

export interface Muscle {
    readonly id: string;
    readonly name: string;
    readonly exercises: Exercise[];
}
