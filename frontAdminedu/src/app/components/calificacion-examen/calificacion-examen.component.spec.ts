import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionExamenComponent } from './calificacion-examen.component';

describe('CalificacionExamenComponent', () => {
  let component: CalificacionExamenComponent;
  let fixture: ComponentFixture<CalificacionExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
