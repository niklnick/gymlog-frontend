import { Muscle } from "../muscles/muscle.model";

export interface Exercise {
    readonly id: string;
    readonly name: string;
    readonly muscles: Muscle[];
}
