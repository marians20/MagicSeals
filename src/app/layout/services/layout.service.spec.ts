import { TestBed } from '@angular/core/testing';

import { LayoutService } from './layout.service';

describe('SidebarService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});