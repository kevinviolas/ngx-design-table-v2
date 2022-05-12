import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFlagComponent } from './ngx-flag.component';

describe('NgxFlagComponent', () => {
  let component: NgxFlagComponent;
  let fixture: ComponentFixture<NgxFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFlagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
