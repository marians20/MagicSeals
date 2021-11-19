import { TestBed } from '@angular/core/testing';

import { GraphicalSigilService } from './graphical-seal.service';

describe('GraphicalSealService', () => {
  let service: GraphicalSigilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphicalSigilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
