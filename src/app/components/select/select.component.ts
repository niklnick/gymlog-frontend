import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() options: any[] = [];
  @Output() selectedChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  readonly selectForm: FormGroup = new FormGroup({ options: new FormArray([]) });

  isCollapsed: boolean = true;

  ngOnInit(): void {
    this.optionsFormArray.valueChanges.subscribe((values: boolean[]) => {
      if (values.length === this.options.length) this.selectedChange.emit(this.selected);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) this.initOptionsFormArray();
  }

  private initOptionsFormArray(): void {
    this.optionsFormArray.clear();
    this.options.forEach(() => this.optionsFormArray.push(new FormControl(false)));
  }

  get optionsFormArray(): FormArray {
    return this.selectForm.get('options') as FormArray;
  }

  get selected(): any[] {
    return this.options.filter((_, i) => this.optionsFormArray.at(i).value);
  }

  get formatSelected(): string {
    return this.selected.map((option: any) => option.name).join(', ');
  }

  onToggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
