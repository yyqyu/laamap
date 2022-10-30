import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnMapAirportComponent } from './on-map-airport.component';

describe('OnMapAirportComponent', () => {
  let component: OnMapAirportComponent;
  let fixture: ComponentFixture<OnMapAirportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnMapAirportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnMapAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
