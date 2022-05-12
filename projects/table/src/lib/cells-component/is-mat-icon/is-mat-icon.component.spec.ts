import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsMatIconComponent } from './is-mat-icon.component';

describe('IsMatIconComponent', () => {
  let component: IsMatIconComponent;
  let fixture: ComponentFixture<IsMatIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsMatIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsMatIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
