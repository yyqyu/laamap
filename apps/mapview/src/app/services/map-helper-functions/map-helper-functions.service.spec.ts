import { TestBed } from '@angular/core/testing';

import { MapHelperFunctionsService } from './map-helper-functions.service';

describe('MapHelperFunctionsService', () => {
  let service: MapHelperFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapHelperFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
