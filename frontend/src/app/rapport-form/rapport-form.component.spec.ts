import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportFormComponent } from './rapport-form.component';

describe('RapportFormComponent', () => {
  let component: RapportFormComponent;
  let fixture: ComponentFixture<RapportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
