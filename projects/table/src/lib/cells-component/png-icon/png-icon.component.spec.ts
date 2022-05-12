import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PngIconComponent } from './png-icon.component';

describe('PngIconComponent', () => {
  let component: PngIconComponent;
  let fixture: ComponentFixture<PngIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PngIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PngIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
