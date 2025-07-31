import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly storageKey = 'selectedTheme';
  private themeSubject = new BehaviorSubject<string>('gryffindor');
  readonly theme$ = this.themeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.storageKey);
      const initial = stored || 'gryffindor';
      this.themeSubject.next(initial);
      this.applyTheme(initial);
    }
  }

  setTheme(theme: string): void {
    this.themeSubject.next(theme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, theme);
      this.applyTheme(theme);
    }
  }

  private applyTheme(theme: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const body = document.body;
    body.classList.remove(
      'gryffindor-theme',
      'slytherin-theme',
      'hufflepuff-theme',
      'ravencaw-theme'
    );

    // Always use dark mode
    document.documentElement.style.colorScheme = 'dark';

    body.classList.add(`${theme}-theme`);
  }

  get currentTheme(): string {
    return this.themeSubject.value;
  }
}
