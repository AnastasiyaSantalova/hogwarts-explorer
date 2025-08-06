import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs/operators';

/**
 * IngredientFilters component that provides filtering options for ingredients.
 */

@Component({
  selector: 'app-ingredient-filters',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './ingredient-filters.html',
  styleUrl: './ingredient-filters.scss',
})
export class IngredientFilters {
  @Output() onFilterChange: EventEmitter<string> = new EventEmitter();

  protected nameFilter = new FormControl('');

  constructor() {
    this.nameFilter.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.onFilterChange.emit(value ?? '');
    });
  }
}
