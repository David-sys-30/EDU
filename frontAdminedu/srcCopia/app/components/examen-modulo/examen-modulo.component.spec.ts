import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenModuloComponent } from './examen-modulo.component';

describe('ExamenModuloComponent', () => {
  let component: ExamenModuloComponent;
  let fixture: ComponentFixture<ExamenModuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenModuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
