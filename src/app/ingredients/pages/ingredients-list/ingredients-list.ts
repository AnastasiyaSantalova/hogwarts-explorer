import { Component } from '@angular/core';
import { IngredientCard } from '../../components/ingredient-card/ingredient-card';
import { Ingredient } from '../../types';
import { Ingredients } from '../../services/ingredients';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Loader } from '../../../shared/components/loader/loader';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { PageHeader } from "../../../shared/components/page-header/page-header";

@Component({
  selector: 'app-ingredients-list',
  imports: [
    IngredientCard,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    Loader,
    ErrorMessage,
    PageHeader
],
  templateUrl: './ingredients-list.html',
  styleUrl: './ingredients-list.scss',
})
export class IngredientsList {
  protected ingredients: Ingredient[] = [];
  protected filteredIngredients: Ingredient[] = [];
  protected isLoading = false;
  protected error = false;
  protected nameFilter = new FormControl('');

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
          this.filteredIngredients = this.filterIngredients(data);
        },
        error: (error) => {
          console.error('Error loading ingredients:', error);
          this.error = true;
          this.ingredients = [];
          this.filteredIngredients = [];
        },
      });
  }

  filterIngredients(ingredients: Ingredient[]): Ingredient[] {
    return ingredients.filter((ingredient) =>
      ingredient.name
        .toLowerCase()
        .includes(this.nameFilter.value?.toLowerCase() ?? '')
    );
  }

  onFilterChange(): void {
    this.filteredIngredients = this.filterIngredients(this.ingredients);
  }

  protected retryLoadIngredients(): void {
    this.filteredIngredients = [];
    this.loadIngredients();
  }
}
