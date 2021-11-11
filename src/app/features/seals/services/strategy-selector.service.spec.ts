import { TestBed } from '@angular/core/testing';

import { StrategySelectorService } from './strategy-selector.service';

describe('StrategySelectorService', () => {
  let service: StrategySelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrategySelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
