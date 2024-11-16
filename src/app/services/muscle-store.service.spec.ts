import { TestBed } from '@angular/core/testing';
import { MuscleStoreService } from './muscle-store.service';

describe('MuscleStoreService', () => {
  let service: MuscleStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MuscleStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
