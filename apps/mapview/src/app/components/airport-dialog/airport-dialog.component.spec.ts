import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AirportDialogComponent } from './airport-dialog.component';

describe('AirportDialogComponent', () => {
  let component: AirportDialogComponent;
  let fixture: ComponentFixture<AirportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirportDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(AirportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
