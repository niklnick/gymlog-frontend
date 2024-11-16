import { Equipment } from "./equipment.model";
import { Muscle } from "./muscle.model";

export interface Exercise {
    readonly id: string;
    readonly name: string;
    readonly primaryMuscles: Muscle[];
    readonly secondaryMuscles: Muscle[];
    readonly equipment: Equipment | null;
}
