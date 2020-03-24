import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPerfilesComponent } from './asignar-perfiles.component';

describe('AsignarPerfilesComponent', () => {
  let component: AsignarPerfilesComponent;
  let fixture: ComponentFixture<AsignarPerfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarPerfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
