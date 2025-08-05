import { Component } from '@angular/core';
import { House } from '../../types';
import { Houses } from '../../services/houses';
import { HouseCard } from '../../components/house-card/house-card';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { Loader } from '../../../shared/components/loader/loader';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { PageHeader } from "../../../shared/components/page-header/page-header";

/**
 * HousesList component that displays a list of houses.
 */

@Component({
  selector: 'app-houses-list',
  imports: [HouseCard, CommonModule, Loader, ErrorMessage, PageHeader],
  templateUrl: './houses-list.html',
  styleUrl: './houses-list.scss',
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

    this.housesService
      .getHouses()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.houses = data;
        },
        error: (error) => {
          console.error('Error loading houses:', error);
          this.error = true;
          this.houses = [];
        }
      });
  }

  protected retryLoadHouses(): void {
    this.loadHouses();
  }
}
