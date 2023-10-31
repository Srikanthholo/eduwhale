import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentregisterComponent } from './studentregister.component';

describe('StudentregisterComponent', () => {
  let component: StudentregisterComponent;
  let fixture: ComponentFixture<StudentregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentregisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
