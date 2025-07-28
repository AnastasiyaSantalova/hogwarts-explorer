import { TestBed } from '@angular/core/testing';

import { Houses } from './houses';

describe('Houses', () => {
  let service: Houses;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Houses);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
