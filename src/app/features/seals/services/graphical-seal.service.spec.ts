import { TestBed } from '@angular/core/testing';

import { GraphicalSealService } from './graphical-seal.service';

describe('GraphicalSealService', () => {
  let service: GraphicalSealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphicalSealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
