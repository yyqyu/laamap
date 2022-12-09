import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnMapAirSpacesComponent } from './on-map-air-spaces.component';

describe('OnMapAirSpacesComponent', () => {
  let component: OnMapAirSpacesComponent;
  let fixture: ComponentFixture<OnMapAirSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnMapAirSpacesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnMapAirSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
