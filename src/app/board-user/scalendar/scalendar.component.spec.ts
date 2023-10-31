import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalendarComponent } from './scalendar.component';

describe('ScalendarComponent', () => {
  let component: ScalendarComponent;
  let fixture: ComponentFixture<ScalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
