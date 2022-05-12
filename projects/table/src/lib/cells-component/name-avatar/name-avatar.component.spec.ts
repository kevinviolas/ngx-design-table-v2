import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameAvatarComponent } from './name-avatar.component';

describe('NameAvatarComponent', () => {
  let component: NameAvatarComponent;
  let fixture: ComponentFixture<NameAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
