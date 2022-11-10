import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RainViewerService } from './rain-viewer.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('RainViewerService', () => {
  let service: RainViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RainViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
