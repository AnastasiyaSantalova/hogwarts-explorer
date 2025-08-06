import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientCard } from './ingredient-card';
import { MOCK_INGREDIENT_1 } from '../../__mocks__/ingredients.mock';

describe('IngredientCard', () => {
  let component: IngredientCard;
  let fixture: ComponentFixture<IngredientCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientCard],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display ingredient name', () => {
    component.ingredient = { ...MOCK_INGREDIENT_1 };
    fixture.detectChanges();
    const nameElement = fixture.nativeElement.querySelector('.ingredient-name');
    expect(nameElement.textContent).toContain(MOCK_INGREDIENT_1.name);
  });

  it('should handle empty ingredient', () => {
    component.ingredient = undefined as any;
    fixture.detectChanges();
    const nameElement = fixture.nativeElement.querySelector('.ingredient-name');
    expect(nameElement).toBeNull();
  });
  it('should handle null ingredient', () => {
    component.ingredient = null as any;
    fixture.detectChanges();
    const nameElement = fixture.nativeElement.querySelector('.ingredient-name');
    expect(nameElement).toBeNull();
  });

  it('should handle ingredient with empty name', () => {
    component.ingredient = { ...MOCK_INGREDIENT_1, name: '' };
    fixture.detectChanges();
    const nameElement = fixture.nativeElement.querySelector('.ingredient-name');
    expect(nameElement.textContent).toBe('');
  });
});
