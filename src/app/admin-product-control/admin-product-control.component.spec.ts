import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductControlComponent } from './admin-product-control.component';

describe('AdminProductControlComponent', () => {
  let component: AdminProductControlComponent;
  let fixture: ComponentFixture<AdminProductControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
