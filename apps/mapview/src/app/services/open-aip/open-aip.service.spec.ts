import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OpenAipService } from './open-aip.service';

describe('OpenAipService', () => {
  let service: OpenAipService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(OpenAipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
