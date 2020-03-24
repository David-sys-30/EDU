import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInstructorComponent } from './chat-instructor.component';

describe('ChatInstructorComponent', () => {
  let component: ChatInstructorComponent;
  let fixture: ComponentFixture<ChatInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
