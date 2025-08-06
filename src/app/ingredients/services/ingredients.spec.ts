import { TestBed } from '@angular/core/testing';

import { Ingredients } from './ingredients';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { MOCK_INGREDIENT_1, MOCK_INGREDIENTS } from '../__mocks__/ingredients.mock';

describe('Ingredients', () => {
  let service: Ingredients;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(Ingredients);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch ingredients', (done) => {
    spyOn(service, 'getIngredients').and.returnValue(
      // Return a successful Observable
      of(MOCK_INGREDIENTS)
    );

    service.getIngredients().subscribe((ingredients) => {
      expect(ingredients).toBeDefined();
      expect(Array.isArray(ingredients)).toBeTrue();
      done();
    });
  });

  it('should handle errors gracefully', (done) => {
    spyOn(service, 'getIngredients').and.returnValue(
      // Return an Observable that emits an error
      throwError(() => new Error('Test error'))
    );

    service.getIngredients().subscribe({
      next: () => {},
      error: (err) => {
        expect(err.message).toBe('Test error');
        done();
      }
    });
  });

  it('should fetch ingredient by ID', (done) => {
    const ingredientId = MOCK_INGREDIENT_1.id;

    spyOn(service, 'getIngredientById').and.returnValue(
      // Return a successful Observable
      of(MOCK_INGREDIENT_1)
    );

    service.getIngredientById(ingredientId).subscribe((ingredient) => {
      expect(ingredient).toBeDefined();
      expect(ingredient.id).toBe(ingredientId);
      done();
    });
  });

  it('should handle errors when fetching ingredient by ID', (done) => {
    const ingredientId = MOCK_INGREDIENT_1.id;
    spyOn(service, 'getIngredientById').and.returnValue(
      // Return an Observable that emits an error
      throwError(() => new Error('Ingredient not found'))
    );
    service.getIngredientById(ingredientId).subscribe({
      next: () => {},
      error: (err) => {
        expect(err.message).toBe('Ingredient not found');
        done();
      }
    });
  });
});
