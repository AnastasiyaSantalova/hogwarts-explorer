import { Component } from '@angular/core';
import { IngredientCard } from '../../components/ingredient-card/ingredient-card';
import { Ingredient } from '../../types';
import { Ingredients } from '../../services/ingredients';
import { delay, finalize, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredients-list',
  imports: [
    IngredientCard,
    CommonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
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
      .subscribe((data) => {
        this.ingredients = [...data];
        this.filteredIngredients = this.filterIngredients(data);
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
    console.log(this.filteredIngredients);
  }
}
