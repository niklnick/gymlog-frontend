import { TestBed } from '@angular/core/testing';
import { EquipmentStoreService } from './equipment-store.service';

describe('EquipmentStoreService', () => {
  let service: EquipmentStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
