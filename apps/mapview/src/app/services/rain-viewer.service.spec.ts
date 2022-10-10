import { TestBed } from '@angular/core/testing';

import { RainViewerService } from './rain-viewer.service';

describe('RainViewerService', () => {
  let service: RainViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RainViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
