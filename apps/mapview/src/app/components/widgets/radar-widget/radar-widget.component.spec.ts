import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarWidgetComponent } from './radar-widget.component';

describe('RadarWidgetComponent', () => {
  let component: RadarWidgetComponent;
  let fixture: ComponentFixture<RadarWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadarWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadarWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
