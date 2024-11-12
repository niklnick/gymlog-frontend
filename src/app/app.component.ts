import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { SelectComponent } from './components/select/select.component';
import { MuscleStoreService } from './muscles/muscle-store.service';
import { Muscle } from './muscles/muscle.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, SelectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly muscles$: Observable<Muscle[]>;
  readonly musclesForm: FormGroup = new FormGroup({ muscles: new FormControl<Muscle[]>([]) });

  constructor(private readonly muscleStoreService: MuscleStoreService) {
    this.muscles$ = this.muscleStoreService.muscles$;
  }

  onSelectedChange(selected: Muscle[]): void {
    (this.musclesForm.get('muscles') as FormControl<Muscle[]>).setValue(selected);
  }
}
