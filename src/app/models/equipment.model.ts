import { Exercise } from "./exercise.model";

export interface Equipment {
    readonly id: string;
    readonly name: string;
    readonly exercises?: Exercise[];
}
