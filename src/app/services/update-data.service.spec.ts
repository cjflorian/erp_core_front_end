import { TestBed } from '@angular/core/testing';

import { UpdateDataService } from './update-data.service';

describe('UpdateDataService', () => {
  let service: UpdateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
