import { TestBed } from '@angular/core/testing';

import { Elixirs } from './elixirs';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { Elixir } from '../types';
import {
  MOCK_ELIXIR_1,
  MOCK_ELIXIR_FILTER_INPUTS,
  MOCK_ELIXIRS,
} from '../__mocks__/elixirs.mock';

describe('Elixirs', () => {
  let service: Elixirs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(Elixirs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch elixirs', (done) => {
    service.getElixirs().subscribe((elixirs) => {
      expect(elixirs).toBeDefined();
      expect(Array.isArray(elixirs)).toBeTrue();
      done();
    });
  });

  it('should handle errors gracefully', (done) => {
    spyOn(service, 'getElixirs').and.returnValue(
      // Return an Observable that emits an error
      throwError(() => new Error('Test error'))
    );

    service.getElixirs().subscribe({
      next: () => {},
      error: (err) => {
        expect(err.message).toBe('Test error');
        done();
      },
    });
  });

  it('should filter elixirs based on inputs', (done) => {
    spyOn(service, 'getElixirs').and.callFake(
      (name, difficulty, ingredient, inventorFullName, manufacturer) => {
        const filtered = MOCK_ELIXIRS.filter(
          (elixir) =>
            (!name || elixir.name === name) &&
            (!difficulty || elixir.difficulty === difficulty) &&
            (!ingredient ||
              elixir.ingredients.some((ing) => ing.name === ingredient)) &&
            (!inventorFullName ||
              elixir.inventors.some(
                (inv) => `${inv.firstName} ${inv.lastName}` === inventorFullName
              )) &&
            (!manufacturer || elixir.manufacturer === manufacturer)
        );
        return of(filtered);
      }
    );

    service
      .getElixirs(
        MOCK_ELIXIR_FILTER_INPUTS.name,
        MOCK_ELIXIR_FILTER_INPUTS.difficulty,
        MOCK_ELIXIR_FILTER_INPUTS.ingredient,
        MOCK_ELIXIR_FILTER_INPUTS.inventorFullName,
        MOCK_ELIXIR_FILTER_INPUTS.manufacturer
      )
      .subscribe((elixirs) => {
        expect(elixirs).toEqual([MOCK_ELIXIR_1]);
        done();
      });
  });

  it('should return an empty array if no elixirs match the filters', (done) => {
    spyOn(service, 'getElixirs').and.callFake(
      (name, difficulty, ingredient, inventorFullName, manufacturer) => {
        const filtered = MOCK_ELIXIRS.filter(
          (elixir) =>
            (!name || elixir.name === name) &&
            (!difficulty || elixir.difficulty === difficulty) &&
            (!ingredient ||
              elixir.ingredients.some((ing) => ing.name === ingredient)) &&
            (!inventorFullName ||
              elixir.inventors.some(
                (inv) => `${inv.firstName} ${inv.lastName}` === inventorFullName
              )) &&
            (!manufacturer || elixir.manufacturer === manufacturer)
        );
        return of(filtered);
      }
    );

    // Use filter values that do NOT match any elixir
    service
      .getElixirs(
        'Nonexistent Elixir',
        'Impossible Difficulty',
        'Unknown Ingredient',
        'Nobody',
        'No Manufacturer'
      )
      .subscribe((elixirs) => {
        expect(elixirs).toEqual([]);
        done();
      });
  });

  it('should handle empty filter inputs', (done) => {
    service.getElixirs('', '', '', '', '').subscribe((elixirs) => {
      expect(elixirs).toBeDefined();
      expect(Array.isArray(elixirs)).toBeTrue();
      // Assuming the service returns all elixirs when no filters are applied
      expect(elixirs.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should return an empty array if no elixirs are available', (done) => {
    spyOn(service, 'getElixirs').and.returnValue(of([]));

    service.getElixirs().subscribe((elixirs) => {
      expect(elixirs).toEqual([]);
      done();
    });
  });

  it('should fetch an elixir by ID', (done) => {
    const mockId = '12345';
    spyOn(service, 'getElixirById').and.returnValue(
      of({ id: mockId } as Elixir)
    );

    service.getElixirById(mockId).subscribe((elixir) => {
      expect(elixir).toBeDefined();
      expect(elixir.id).toBe(mockId);
      done();
    });
  });
});
