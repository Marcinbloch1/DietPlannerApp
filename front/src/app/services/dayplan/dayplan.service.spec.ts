import { TestBed } from '@angular/core/testing';

import { DayplanService } from './dayplan.service';

describe('DayplanService', () => {
  let service: DayplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
