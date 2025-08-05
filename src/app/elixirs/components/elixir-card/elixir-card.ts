import { Component, Input } from '@angular/core';
import { Elixir } from '../../types';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { EmptyDashPipe } from '../../../shared/pipes/empty-dash-pipe';

/**
 * ElixirCard component that displays an individual elixir.
 */

@Component({
  selector: 'app-elixir-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    CommonModule,
    EmptyDashPipe,
  ],
  templateUrl: './elixir-card.html',
  styleUrl: './elixir-card.scss',
})
export class ElixirCard {
  @Input() elixir!: Elixir;

  protected ingredients: string = '';
  protected inventors: string = '';

  ngOnInit(): void {
    if (this.elixir) {
      // Join ingredients strings for display
      this.ingredients = this.elixir.ingredients.reduce((acc, ingredient) => {
        return acc ? `${acc}, ${ingredient.name}` : ingredient.name;
      }, '');

      // Join inventors' full names for display
      this.inventors = this.elixir.inventors
        .map((inventor) => `${inventor.firstName} ${inventor.lastName}`)
        .join(', ');
    }
  }
}
