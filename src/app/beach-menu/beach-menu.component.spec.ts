import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeachMenuComponent } from './beach-menu.component';

describe('BeachMenuComponent', () => {
  let component: BeachMenuComponent;
  let fixture: ComponentFixture<BeachMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeachMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeachMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
