import { TestBed } from '@angular/core/testing';
import { ExerciseStoreService } from './exercise-store.service';

describe('ExerciseStoreService', () => {
  let service: ExerciseStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
