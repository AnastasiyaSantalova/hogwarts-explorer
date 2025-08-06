import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientFilters } from './ingredient-filters';

describe('IngredientFilters', () => {
  let component: IngredientFilters;
  let fixture: ComponentFixture<IngredientFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render filter input', () => {
    const filterInput = fixture.nativeElement.querySelector('input');
    expect(filterInput).toBeTruthy();
  });
});
