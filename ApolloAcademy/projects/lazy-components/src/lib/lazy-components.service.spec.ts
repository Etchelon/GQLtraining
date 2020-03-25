import { TestBed } from '@angular/core/testing';

import { LazyComponentsService } from './lazy-components.service';

describe('LazyComponentsService', () => {
  let service: LazyComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
