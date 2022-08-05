import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleLineComponent } from './double-line.component';

describe('DoubleLineComponent', () => {
  let component: DoubleLineComponent;
  let fixture: ComponentFixture<DoubleLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoubleLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
