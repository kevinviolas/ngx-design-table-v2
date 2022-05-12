import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementStatusComponent } from './equipement-status.component';

describe('EquipementStatusComponent', () => {
  let component: EquipementStatusComponent;
  let fixture: ComponentFixture<EquipementStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipementStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipementStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
