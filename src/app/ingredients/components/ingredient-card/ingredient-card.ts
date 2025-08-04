import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Ingredient } from '../../types';

@Component({
  selector: 'app-ingredient-card',
  imports: [MatCardModule],
  templateUrl: './ingredient-card.html',
  styleUrl: './ingredient-card.scss',
})
export class IngredientCard {
  @Input() ingredient!: Ingredient;
}
