import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';

describe('SelectComponent', <T>() => {
  let component: SelectComponent<T>;
  let fixture: ComponentFixture<SelectComponent<T>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent<T>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
