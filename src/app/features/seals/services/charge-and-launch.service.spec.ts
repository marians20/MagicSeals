import { TestBed } from '@angular/core/testing';

import { ChargeAndLaunchService } from './charge-and-launch.service';

describe('ChargeAndLaunchService', () => {
  let service: ChargeAndLaunchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChargeAndLaunchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
