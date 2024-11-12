import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Muscle } from '../../muscles/muscle.model';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  readonly mockMuscles: Muscle[] = [
    { id: '1', name: 'Biceps' },
    { id: '2', name: 'Deltoids' },
    { id: '3', name: 'Pectoralis' },
    { id: '4', name: 'Triceps' }
  ];
  readonly selectForm: FormGroup = new FormGroup({
    options: new FormArray(this.mockMuscles.map(() => new FormControl(false)))
  });

  isCollapsed: boolean = true;

  get selected(): Muscle[] {
    return this.mockMuscles.filter((_, i) => (this.selectForm.get('options') as FormArray).at(i).value);
  }

  get formatSelected(): string {
    return this.selected.map((muscle: Muscle) => muscle.name).join(', ');
  }

  onToggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
