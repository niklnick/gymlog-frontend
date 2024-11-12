import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Muscle } from '../../muscles/muscle.model';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() options: Muscle[] = [];

  readonly dropdownForm: FormGroup = new FormGroup({
    options: new FormControl<Muscle | null>(null)
  });
  isCollapsed: boolean = true;

  @Output() get selected(): Muscle | null {
    return this.dropdownForm.value.options;
  }

  onToggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
