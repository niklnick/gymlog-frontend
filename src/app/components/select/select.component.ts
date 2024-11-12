import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements OnChanges {
  @Input() options: any[] = [];

  readonly selectForm: FormGroup = new FormGroup({ options: new FormArray([]) });

  isCollapsed: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) this.initOptionsFormArray();
  }

  private initOptionsFormArray(): void {
    const optionsFormArray: FormArray = this.selectForm.get('options') as FormArray;
    optionsFormArray.clear();
    this.options.forEach(() => optionsFormArray.push(new FormControl(false)));
  }

  get selected(): any[] {
    return this.options.filter((_, i) => (this.selectForm.get('options') as FormArray).at(i).value);
  }

  get formatSelected(): string {
    return this.selected.map((option: any) => option.name).join(', ');
  }

  onToggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
