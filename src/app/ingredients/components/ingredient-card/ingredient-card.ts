import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Ingredient } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredient-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './ingredient-card.html',
  styleUrls: ['./ingredient-card.scss'],
})
export class IngredientCard {
  @Input() ingredient!: Ingredient;
}
