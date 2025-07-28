import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Spell } from '../../types';

@Component({
  selector: 'app-spell-card',
  imports: [CommonModule, MatCardModule],
  templateUrl: './spell-card.html',
  styleUrl: './spell-card.scss'
})
export class SpellCard {
  @Input() spell: Spell = {} as Spell;
}
