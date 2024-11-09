import { TestBed } from '@angular/core/testing';
import { WorkoutStoreService } from './workout-store.service';

describe('WorkoutStoreService', () => {
  let service: WorkoutStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
