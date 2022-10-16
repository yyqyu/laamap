import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnMapRadarComponent } from './on-map-radar.component';

describe('OnMapRadarComponent', () => {
  let component: OnMapRadarComponent;
  let fixture: ComponentFixture<OnMapRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnMapRadarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnMapRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
