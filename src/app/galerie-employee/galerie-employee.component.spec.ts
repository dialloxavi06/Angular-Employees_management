import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalerieEmployeeComponent } from './galerie-employee.component';

describe('GalerieEmployeeComponent', () => {
  let component: GalerieEmployeeComponent;
  let fixture: ComponentFixture<GalerieEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalerieEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalerieEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
