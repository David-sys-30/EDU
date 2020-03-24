import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaAdministradorComponent } from './actualiza-administrador.component';

describe('ActualizaAdministradorComponent', () => {
  let component: ActualizaAdministradorComponent;
  let fixture: ComponentFixture<ActualizaAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizaAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizaAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
