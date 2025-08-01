import { Component, Input } from '@angular/core';
import { House } from '../../types';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-house-card',
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './house-card.html',
  styleUrl: './house-card.scss'
})
export class HouseCard {
  @Input() house!: House;
}
