import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosbComponent } from './alumnosb.component';

describe('AlumnosbComponent', () => {
  let component: AlumnosbComponent;
  let fixture: ComponentFixture<AlumnosbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
