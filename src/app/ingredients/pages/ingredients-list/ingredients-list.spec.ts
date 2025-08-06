import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsList } from './ingredients-list';
import { MOCK_INGREDIENT_1, MOCK_INGREDIENTS } from '../../__mocks__/ingredients.mock';
import { provideHttpClient } from '@angular/common/http';

describe('IngredientsList', () => {
  let component: IngredientsList;
  let fixture: ComponentFixture<IngredientsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsList],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the ingredients list page', () => {
    const ingredientsList = fixture.nativeElement.querySelector('.ingredients-list');
    expect(ingredientsList).toBeTruthy();
  });

  it('should render the page header', () => {
    const pageHeader = fixture.nativeElement.querySelector('app-page-header');
    expect(pageHeader).toBeTruthy();
  });

  it('should render the loader when loading is true', () => {
    (component as any).isLoading = true;
    fixture.detectChanges();
    const loader = fixture.nativeElement.querySelector('app-loader');
    expect(loader).toBeTruthy();
  });

  it('should render the error message when error is true', () => {
    (component as any).error = true;
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('app-error-message');
    expect(errorMessage).toBeTruthy();
  });

  it('should render the ingredient filters', () => {
    const ingredientFilters = fixture.nativeElement.querySelector('app-ingredient-filters');
    expect(ingredientFilters).toBeTruthy();
  });

  it('should render the ingredient cards', () => {
    (component as any).filteredIngredients = [...MOCK_INGREDIENTS];
    fixture.detectChanges();
    const ingredientCards = fixture.nativeElement.querySelectorAll('.ingredient-card');
    expect(ingredientCards).toBeTruthy();
    expect(ingredientCards.length).toBe(MOCK_INGREDIENTS.length);
  });

  it('should filter ingredients based on the filter input', () => {
    (component as any).ingredients = [...MOCK_INGREDIENTS];
    const filteredIngredients = component.filterIngredients(MOCK_INGREDIENTS, MOCK_INGREDIENT_1.name);
    expect(filteredIngredients.length).toBe(1);
    expect(filteredIngredients[0].name).toBe(MOCK_INGREDIENT_1.name);
  });

  it('should return all ingredients if filter input is empty', () => {
    (component as any).ingredients = [...MOCK_INGREDIENTS];
    const filteredIngredients = component.filterIngredients(MOCK_INGREDIENTS, '');
    expect(filteredIngredients.length).toBe(MOCK_INGREDIENTS.length);
  });
});
