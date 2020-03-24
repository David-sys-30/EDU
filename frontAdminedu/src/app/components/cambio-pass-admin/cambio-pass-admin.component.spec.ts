import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioPassAdminComponent } from './cambio-pass-admin.component';

describe('CambioPassAdminComponent', () => {
  let component: CambioPassAdminComponent;
  let fixture: ComponentFixture<CambioPassAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioPassAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioPassAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
