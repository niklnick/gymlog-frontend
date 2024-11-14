import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent<T> {
  @Input({ required: true }) options: T[] = [];
  @Input({ required: true }) labelKey!: keyof T;

  @Output() readonly select: EventEmitter<T[]> = new EventEmitter<T[]>();

  isExpanded: boolean = false;

  private selected: T[] = [];

  get title(): string {
    return this.selected.length > 0 ?
      this.selected.map((selected: T) => selected[this.labelKey]).join(', ') : 'Select';
  }

  isSelected(option: T): boolean {
    return this.selected.includes(option);
  }

  onSelect(option: T): void {
    this.selected = this.selected.includes(option) ?
      this.selected.filter((selected: T) => selected !== option) : [...this.selected, option];

    this.select.emit(this.selected);
  }
}
