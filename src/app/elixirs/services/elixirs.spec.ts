import { TestBed } from '@angular/core/testing';

import { Elixirs } from './elixirs';

describe('Elixirs', () => {
  let service: Elixirs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Elixirs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
