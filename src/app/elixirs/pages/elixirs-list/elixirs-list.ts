import { Component } from '@angular/core';
import { Elixirs } from '../../services/elixirs';
import { Elixir, ElixirFilterInputs } from '../../types';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { Loader } from '../../../shared/components/loader/loader';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { ElixirCard } from '../../components/elixir-card/elixir-card';
import { ElixirFilters } from '../../components/elixir-filters/elixir-filters';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-elixirs-list',
  imports: [
    Loader,
    ErrorMessage,
    CommonModule,
    ElixirCard,
    ElixirFilters,
    PageHeader,
  ],
  templateUrl: './elixirs-list.html',
  styleUrl: './elixirs-list.scss',
})
export class ElixirsList {
  protected elixirs: Elixir[] = [];
  protected isLoading = false;
  protected error = false;
  protected nameFilter = '';
  protected filteredElixirs: Elixir[] = [];

  // Filter Inputs
  protected filterInputs = {
    name: '',
    difficulty: '',
    ingredient: '',
    inventorFullName: '',
    manufacturer: '',
  };

  constructor(private elixirsService: Elixirs) {}
  ngOnInit(): void {
    this.loadElixirs();
  }

  private loadElixirs(): void {
    this.isLoading = true;
    this.error = false;
    const { name, difficulty, ingredient, inventorFullName, manufacturer } =
      this.filterInputs;

    this.elixirsService
      .getElixirs(name, difficulty, ingredient, inventorFullName, manufacturer)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.elixirs = [...data];
          this.filteredElixirs = [...data];
        },
        error: (error) => {
          console.error('Error loading elixirs:', error);
          this.error = true;
          this.elixirs = [];
          this.filteredElixirs = [];
        },
      });
  }

  protected filterElixirs(elixirFilters: ElixirFilterInputs): void {
    const { name, difficulty, ingredient, inventorFullName, manufacturer } =
      elixirFilters;

    console.log('Filtering elixirs with:', elixirFilters);
    this.elixirsService
      .getElixirs(name, difficulty, ingredient, inventorFullName, manufacturer)
      .subscribe((elixirs) => {
        this.filteredElixirs = elixirs;
        console.log('Filtered elixirs:', this.filteredElixirs);
      });
  }

  protected retryLoadElixirs(): void {
    this.loadElixirs();
  }
}
