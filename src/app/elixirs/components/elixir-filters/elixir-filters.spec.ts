import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElixirFilters } from './elixir-filters';
import { MOCK_ELIXIR_FILTER_INPUTS } from '../../__mocks__/elixirs.mock';

describe('ElixirFilters', () => {
  let component: ElixirFilters;
  let fixture: ComponentFixture<ElixirFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElixirFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(ElixirFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filter changes', (done) => {
    spyOn(component.onFilterChange, 'emit');
    (component as any).nameControl.setValue(MOCK_ELIXIR_FILTER_INPUTS.name);
    (component as any).difficultyControl.setValue(
      MOCK_ELIXIR_FILTER_INPUTS.difficulty
    );
    (component as any).ingredientControl.setValue(
      MOCK_ELIXIR_FILTER_INPUTS.ingredient
    );
    (component as any).inventorFullNameControl.setValue(
      MOCK_ELIXIR_FILTER_INPUTS.inventorFullName
    );
    (component as any).manufacturerControl.setValue(
      MOCK_ELIXIR_FILTER_INPUTS.manufacturer
    );

    setTimeout(() => {
      expect(component.onFilterChange.emit).toHaveBeenCalledWith({
        ...MOCK_ELIXIR_FILTER_INPUTS,
      });
      done();
    }, 350); // Wait for debounce time
  });

  it('should update filter inputs on form control changes', () => {
    (component as any).nameControl.setValue('New Name');
    (component as any).difficultyControl.setValue('Advanced');
    (component as any).ingredientControl.setValue('New Ingredient');
    (component as any).inventorFullNameControl.setValue('Jane Doe');
    (component as any).manufacturerControl.setValue('New Manufacturer');

    setTimeout(() => {
      expect((component as any).filterInputs().name).toBe('New Name');
      expect((component as any).filterInputs().difficulty).toBe('Advanced');
      expect((component as any).filterInputs().ingredient).toBe(
        'New Ingredient'
      );
      expect((component as any).filterInputs().inventorFullName).toBe(
        'Jane Doe'
      );
      expect((component as any).filterInputs().manufacturer).toBe(
        'New Manufacturer'
      );
    }, 350); // Wait for debounce time
  });

  it('should debounce input changes', (done) => {
    spyOn(component.onFilterChange, 'emit');
    (component as any).nameControl.setValue('Debounced Name');
    setTimeout(() => {
      expect(component.onFilterChange.emit).toHaveBeenCalledWith({
        name: 'Debounced Name',
        difficulty: '',
        ingredient: '',
        inventorFullName: '',
        manufacturer: '',
      });
      done();
    }, 350); // Wait for debounce time
  });
});
