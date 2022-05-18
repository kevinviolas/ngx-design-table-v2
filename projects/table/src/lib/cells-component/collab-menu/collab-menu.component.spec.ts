import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabMenuComponent } from './collab-menu.component';

describe('CollabMenuComponent', () => {
  let component: CollabMenuComponent;
  let fixture: ComponentFixture<CollabMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollabMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
