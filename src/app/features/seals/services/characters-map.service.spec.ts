import { TestBed } from '@angular/core/testing';

import { CharactersMapService } from './characters-map.service';

describe('CharactersMapService', () => {
  let service: CharactersMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharactersMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
