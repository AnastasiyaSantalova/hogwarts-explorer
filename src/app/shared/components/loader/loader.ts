import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Loader component that displays a loading spinner.
 */

@Component({
  selector: 'app-loader',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss'
})
export class Loader {}
