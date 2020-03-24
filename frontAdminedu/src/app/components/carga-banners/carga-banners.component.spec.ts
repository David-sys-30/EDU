import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaBannersComponent } from './carga-banners.component';

describe('CargaBannersComponent', () => {
  let component: CargaBannersComponent;
  let fixture: ComponentFixture<CargaBannersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaBannersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
