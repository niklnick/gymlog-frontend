import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Observable } from "rxjs";
import { Exercise } from "../../../models/exercise.model";
import { Muscle } from "../../../models/muscle.model";
import { ExerciseStoreService } from "../../../services/exercise-store.service";

@Component({
    selector: 'app-exercise-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './exercise-list.component.html',
    styleUrl: './exercise-list.component.scss'
})
export class ExerciseListComponent {
    readonly exercises$: Observable<Exercise[]>;

    constructor(private readonly exerciseStoreService: ExerciseStoreService) {
        this.exercises$ = this.exerciseStoreService.exercises$;
    }

    onDelete(id: string): void {
        this.exerciseStoreService.deleteExercise(id).subscribe();
    }

    formatMuscles(muscle: Muscle[]): string {
        return muscle.map((muscle: Muscle) => muscle.name).join(', ');
    }
}
