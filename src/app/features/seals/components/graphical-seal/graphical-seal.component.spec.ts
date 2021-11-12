import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicalSealComponent } from './graphical-seal.component';

describe('GraphicalSealComponent', () => {
  let component: GraphicalSealComponent;
  let fixture: ComponentFixture<GraphicalSealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicalSealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicalSealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
