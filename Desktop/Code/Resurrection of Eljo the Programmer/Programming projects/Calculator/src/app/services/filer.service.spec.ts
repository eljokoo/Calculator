import { TestBed } from '@angular/core/testing';

import { FilerService } from './filer.service';

describe('FilerService', () => {
  let service: FilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
