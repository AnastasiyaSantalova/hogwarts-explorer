import { Component, Output, EventEmitter, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInput, MatFormField, MatLabel } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, merge } from 'rxjs';
import { ElixirDifficulty, ElixirFilterInputs } from '../../types';
import { MatSelectModule } from '@angular/material/select';

/**
 * ElixirFilters component that provides filtering options for elixirs.
 */

@Component({
  selector: 'app-elixir-filters',
  imports: [
    CommonModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './elixir-filters.html',
  styleUrl: './elixir-filters.scss',
})
export class ElixirFilters implements OnInit {
  @Output() onFilterChange: EventEmitter<ElixirFilterInputs> =
    new EventEmitter();

  protected filterInputs = signal({
    name: '',
    difficulty: '',
    ingredient: '',
    inventorFullName: '',
    manufacturer: '',
  });

  protected nameControl = new FormControl('');
  protected difficultyControl = new FormControl('');
  protected ingredientControl = new FormControl('');
  protected inventorFullNameControl = new FormControl('');
  protected manufacturerControl = new FormControl('');

  protected uniqueDifficulties: ElixirDifficulty[] = [
    'Unknown',
    'Advanced',
    'Moderate',
    'Beginner',
    'OrdinaryWizardingLevel',
    'OneOfAKind',
  ];

  ngOnInit(): void {
    merge(
      this.nameControl.valueChanges,
      this.difficultyControl.valueChanges,
      this.ingredientControl.valueChanges,
      this.inventorFullNameControl.valueChanges,
      this.manufacturerControl.valueChanges
    )
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.filterInputs.set({
          name: this.nameControl.value ?? '',
          difficulty: this.difficultyControl.value ?? '',
          ingredient: this.ingredientControl.value ?? '',
          inventorFullName: this.inventorFullNameControl.value ?? '',
          manufacturer: this.manufacturerControl.value ?? '',
        });
        this.emitFilterChange();
      });
  }

  emitFilterChange(): void {
    this.onFilterChange.emit(this.filterInputs());
  }
}
