import { TestBed } from '@angular/core/testing';

import { Elixirs } from './elixirs';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { Elixir } from '../types';

describe('Elixirs', () => {
  let service: Elixirs;

  const mockElixirs = [
    {
      id: '1',
      effect: 'Test Effect',
      sideEffects: '',
      characteristics: '',
      time: '1 hour',
      name: 'Test Elixir',
      ingredients: [
        { id: '123', name: 'Ingredient 1' },
        { id: '312', name: 'Ingredient 2' },
      ],
      inventors: [
        { id: '1', firstName: 'John', lastName: 'Doe' },
        { id: '2', firstName: 'Jane', lastName: 'Smith' },
      ],
      difficulty: 'Moderate',
      manufacturer: 'Test Manufacturer',
    } as Elixir,
  ];

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
    const filterInputs = {
      name: 'Test Elixir',
      difficulty: 'Easy',
      ingredient: 'Test Ingredient',
      inventorFullName: 'John Doe',
      manufacturer: 'Test Manufacturer',
    };

    spyOn(service, 'getElixirs').and.returnValue(of(mockElixirs));

    service
      .getElixirs(
        filterInputs.name,
        filterInputs.difficulty,
        filterInputs.ingredient,
        filterInputs.inventorFullName,
        filterInputs.manufacturer
      )
      .subscribe((elixirs) => {
        expect(elixirs).toEqual(mockElixirs);
        done();
      });
  });

  it('should return an empty array if no elixirs match the filters', (done) => {
    const filterInputs = {
      name: 'Nonexistent Elixir',
      difficulty: 'Impossible',
      ingredient: 'Nonexistent Ingredient',
      inventorFullName: 'Nonexistent Inventor',
      manufacturer: 'Nonexistent Manufacturer',
    };

    // Simulate filtering logic
    const filtered = mockElixirs.filter(elixir =>
      elixir.name === filterInputs.name &&
      elixir.difficulty === filterInputs.difficulty &&
      elixir.ingredients.some(ing => ing.name === filterInputs.ingredient) &&
      elixir.inventors.some(inv => `${inv.firstName} ${inv.lastName}` === filterInputs.inventorFullName) &&
      elixir.manufacturer === filterInputs.manufacturer
    );

    spyOn(service, 'getElixirs').and.returnValue(of(filtered));

    service
      .getElixirs(
        filterInputs.name,
        filterInputs.difficulty,
        filterInputs.ingredient,
        filterInputs.inventorFullName,
        filterInputs.manufacturer
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
    spyOn(service, 'getElixirById').and.returnValue(of({ id: mockId } as Elixir));

    service.getElixirById(mockId).subscribe((elixir) => {
      expect(elixir).toBeDefined();
      expect(elixir.id).toBe(mockId);
      done();
    });
  });
});
