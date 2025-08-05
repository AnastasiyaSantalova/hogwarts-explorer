import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElixirFilters } from './elixir-filters';

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
    (component as any).nameControl.setValue('Test Elixir');
    (component as any).difficultyControl.setValue('Moderate');
    (component as any).ingredientControl.setValue('Test Ingredient');
    (component as any).inventorFullNameControl.setValue('John Doe');
    (component as any).manufacturerControl.setValue('Test Manufacturer');

    setTimeout(() => {
      expect(component.onFilterChange.emit).toHaveBeenCalledWith({
        name: 'Test Elixir',
        difficulty: 'Moderate',
        ingredient: 'Test Ingredient',
        inventorFullName: 'John Doe',
        manufacturer: 'Test Manufacturer',
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
