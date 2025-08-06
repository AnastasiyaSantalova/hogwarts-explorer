import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { IngredientCard } from '../../components/ingredient-card/ingredient-card';
import { Ingredient } from '../../types';
import { Ingredients } from '../../services/ingredients';
import { Loader } from '../../../shared/components/loader/loader';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { IngredientFilters } from '../../components/ingredient-filters/ingredient-filters';

@Component({
  selector: 'app-ingredients-list',
  imports: [
    IngredientCard,
    CommonModule,
    Loader,
    ErrorMessage,
    PageHeader,
    IngredientFilters,
  ],
  templateUrl: './ingredients-list.html',
  styleUrl: './ingredients-list.scss',
})

export class IngredientsList implements OnInit {
  protected ingredients: Ingredient[] = [];
  protected filteredIngredients: Ingredient[] = [];
  protected isLoading: boolean = false;
  protected error: boolean = false;

  constructor(private ingredientsService: Ingredients) {}

  ngOnInit(): void {
    this.loadIngredients();
  }

  private loadIngredients(): void {
    this.isLoading = true;
    this.error = false;

    this.ingredientsService
      .getIngredients()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.ingredients = [...data];
          this.filteredIngredients = this.filterIngredients(data, '');
        },
        error: (error) => {
          console.error('Error loading ingredients:', error);
          this.error = true;
          this.ingredients = [];
          this.filteredIngredients = [];
        },
      });
  }

  filterIngredients(ingredients: Ingredient[], name: string): Ingredient[] {
    if (!name || name.trim() === '' || !ingredients) {
      return ingredients;
    }

    return ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(name.toLowerCase() ?? '')
    );
  }

  onFilterChange(name: string): void {
    this.filteredIngredients = this.filterIngredients(this.ingredients, name);
  }

  protected retryLoadIngredients(): void {
    this.filteredIngredients = [];
    this.loadIngredients();
  }
}
