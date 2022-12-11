import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirspacesDialogComponent } from './airspaces-dialog.component';

describe('AirspacesDialogComponent', () => {
  let component: AirspacesDialogComponent;
  let fixture: ComponentFixture<AirspacesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirspacesDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AirspacesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
