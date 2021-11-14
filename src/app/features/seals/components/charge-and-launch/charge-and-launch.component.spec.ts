import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeAndLaunchComponent } from './charge-and-launch.component';

describe('ChargeAndLaunchComponent', () => {
  let component: ChargeAndLaunchComponent;
  let fixture: ComponentFixture<ChargeAndLaunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeAndLaunchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeAndLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
