import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosDestacadosComponent } from './alumnos-destacados.component';

describe('AlumnosDestacadosComponent', () => {
  let component: AlumnosDestacadosComponent;
  let fixture: ComponentFixture<AlumnosDestacadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosDestacadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosDestacadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
