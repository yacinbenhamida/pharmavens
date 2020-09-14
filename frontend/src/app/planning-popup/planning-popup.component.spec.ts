import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningPopupComponent } from './planning-popup.component';

describe('PlanningPopupComponent', () => {
  let component: PlanningPopupComponent;
  let fixture: ComponentFixture<PlanningPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
