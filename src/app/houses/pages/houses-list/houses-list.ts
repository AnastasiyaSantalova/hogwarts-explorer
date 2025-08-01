import { Component } from '@angular/core';
import { House } from '../../types';
import { Houses } from '../../services/houses';
import { HouseCard } from '../../components/house-card/house-card';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-houses-list',
  imports: [HouseCard, CommonModule],
  templateUrl: './houses-list.html',
  styleUrl: './houses-list.scss'
})
export class HousesList {
  protected houses: House[] = [];
  protected isLoading = false;
  protected error = false;

  constructor(private housesService: Houses) {}

  ngOnInit(): void {
    this.loadHouses();
  }

  private loadHouses(): void {
    this.isLoading = true;
    this.error = false;

    this.housesService.getHouses().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe((data) => {
      this.houses = data;
    });
  }
}
