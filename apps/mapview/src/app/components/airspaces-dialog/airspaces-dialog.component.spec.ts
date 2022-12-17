import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AirspacesDialogComponent } from './airspaces-dialog.component';

describe('AirspacesDialogComponent', () => {
  let component: AirspacesDialogComponent;
  let fixture: ComponentFixture<AirspacesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirspacesDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(AirspacesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
