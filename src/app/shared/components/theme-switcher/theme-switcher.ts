import { Component } from '@angular/core';
import { Theme } from '../../services/theme';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-theme-switcher',
  imports: [MatSelectModule, MatFormFieldModule, AsyncPipe],
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.scss',
})
export class ThemeSwitcher {
  theme$!: Observable<string>;

  constructor(private theme: Theme) {}

  ngOnInit() {
    this.theme$ = this.theme.theme$;
  }

  changeTheme(theme: string) {
    this.theme.setTheme(theme);
  }
}
