import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementTypeComponent } from './equipement-type.component';

describe('EquipementTypeComponent', () => {
  let component: EquipementTypeComponent;
  let fixture: ComponentFixture<EquipementTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipementTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipementTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
