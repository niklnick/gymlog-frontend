import { Equipment } from "../equipments/equipment.model";
import { Muscle } from "../muscles/muscle.model";

export interface Exercise {
    readonly id: string;
    readonly name: string;
    readonly primaryMuscles: Muscle[];
    readonly secondaryMuscles: Muscle[];
    readonly equipment: Equipment | null;
}
