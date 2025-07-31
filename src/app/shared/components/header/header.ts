import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';
import { Theme } from '../../services/theme';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    ThemeSwitcher,
    CommonModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  theme$!: Observable<string>;

  constructor(private theme: Theme) {}

  ngOnInit() {
    this.theme$ = this.theme.theme$;
  }
}
