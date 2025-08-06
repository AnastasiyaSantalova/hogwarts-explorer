import { TestBed } from '@angular/core/testing';

import { Houses } from './houses';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { MOCK_HOUSE_GRYFFINDOR } from '../__mocks__/houses.mock';

describe('Houses', () => {
  let service: Houses;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(Houses);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch houses', (done) => {
    service.getHouses().subscribe((houses) => {
      expect(houses).toBeDefined();
      expect(Array.isArray(houses)).toBeTrue();
      done();
    });
  });

  it('should handle errors gracefully', (done) => {
    spyOn(service, 'getHouses').and.returnValue(
      throwError(() => new Error('Network error'))
    );

    service.getHouses().subscribe({
      next: () => {},
      error: (err) => {
        expect(err.message).toBe('Network error');
        done();
      },
    });
  });

  it('should fetch house by ID', (done) => {
    spyOn(service, 'getHouseById').and.returnValue(of(MOCK_HOUSE_GRYFFINDOR));
    service.getHouseById('1').subscribe((house) => {
      expect(house).toEqual(MOCK_HOUSE_GRYFFINDOR);
      done();
    });
  });

  it('should handle error when fetching house by ID', (done) => {
    spyOn(service, 'getHouseById').and.returnValue(
      throwError(() => new Error('House not found'))
    );

    service.getHouseById('999').subscribe({
      next: () => {},
      error: (err) => {
        expect(err.message).toBe('House not found');
        done();
      },
    });
  });
});
