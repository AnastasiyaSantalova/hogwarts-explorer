import { Component, OnInit, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  catchError,
  finalize,
  of,
  Observable,
  combineLatest,
  startWith,
  debounceTime,
  map,
  BehaviorSubject,
  delay,
  tap,
} from 'rxjs';
import { SpellCard } from '../../components/spell-card/spell-card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Spells } from '../../services/spells';
import { CommonModule } from '@angular/common';
import { Spell } from '../../types';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-spells-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SpellCard,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './spells-list.html',
  styleUrl: './spells-list.scss',
  host: {
    ngSkipHydration: 'true',
  },
})
export class SpellsList implements OnInit {
  private allSpellsSubject = new BehaviorSubject<Spell[]>([]);
  private currentPageSubject = new BehaviorSubject<number>(1);
  protected filteredSpells$!: Observable<Spell[]>;
  private scrollHandler!: () => void;
  protected isLoadingMore = false;
  protected filteredSpellsLength = 0;

  protected pageSize = 24;
  protected currentPage = 1;
  protected isLoading: boolean = true;
  protected error: boolean = false;
  protected uniqueTypes: string[] = [];
  protected uniqueLights: string[] = [];

  // Filters
  protected nameFilter = new FormControl<string>('');
  protected typeFilter = new FormControl<string[]>([]);
  protected lightFilter = new FormControl<string[]>([]);
  protected canBeVerbalFilter = new FormControl<boolean>(false);

  constructor(
    private spellsService: Spells,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Load spells immediately without waiting for browser check
    this.loadSpells();

    // Set up filtered spells observable
    this.filteredSpells$ = combineLatest([
      this.allSpellsSubject.asObservable(),
      this.currentPageSubject.asObservable(),
      this.nameFilter.valueChanges.pipe(startWith(''), debounceTime(200)),
      this.typeFilter.valueChanges.pipe(startWith([])),
      this.lightFilter.valueChanges.pipe(startWith([])),
      this.canBeVerbalFilter.valueChanges.pipe(startWith(false)),
    ]).pipe(
      map(([spells, currentPage, name, types, lights, verbal]) => {
        const typeArray = types as string[];
        const lightArray = lights as string[];

        // Pure filtering function
        const filtered = this.filterSpells(
          spells,
          name,
          typeArray,
          lightArray,
          verbal
        );

        // Update the total filtered spells length
        this.filteredSpellsLength = filtered.length;

        // Return paginated results
        return filtered.slice(0, currentPage * this.pageSize);
      })
    );

    // Reset pagination when filters change
    combineLatest([
      this.nameFilter.valueChanges.pipe(startWith(''), debounceTime(200)),
      this.typeFilter.valueChanges.pipe(startWith([])),
      this.lightFilter.valueChanges.pipe(startWith([])),
      this.canBeVerbalFilter.valueChanges.pipe(startWith(false)),
    ]).subscribe(() => {
      this.currentPage = 1;
      this.currentPageSubject.next(1);
    });

    // Add scroll handler only after initial load
    if (isPlatformBrowser(this.platformId)) {
      // Delay scroll handler to prevent conflicts during initial load
      setTimeout(() => {
        this.zone.runOutsideAngular(() => {
          this.scrollHandler = this.onScroll.bind(this);
          window.addEventListener('scroll', this.scrollHandler);
        });
      }, 100);
    }
  }

  private loadSpells(): void {
    this.isLoading = true;
    this.error = false;
    this.currentPage = 1;
    this.currentPageSubject.next(1);

    this.spellsService
      .getSpells()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        catchError((error) => {
          console.error('Error loading spells:', error);
          this.error = true;
          this.allSpellsSubject.next([]);
          return of([]);
        })
      )
      .subscribe((data) => {
        const spells = Array.isArray(data) ? data : [];
        this.allSpellsSubject.next(spells);

        // Update unique types and lights after data is loaded
        this.uniqueTypes = [
          ...new Set(spells.map((spell) => spell.type)),
        ].filter(Boolean);
        this.uniqueLights = [
          ...new Set(spells.map((spell) => spell.light)),
        ].filter(Boolean);
      });
  }

  protected retryLoadSpells(): void {
    this.loadSpells();
  }

  private onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const scrollPos = window.innerHeight + window.scrollY;
    const max = document.documentElement.scrollHeight;

    // Load when user is closer to the bottom (50px instead of 200px)
    if (scrollPos >= max - 10 && !this.isLoadingMore) {
      this.isLoadingMore = true;

      this.zone.run(() => {
        this.loadMore();
      });
    }
  }

  loadMore(): void {
    // Check if there are more spells to load before proceeding
    if (!this.hasMoreSpells) {
      this.isLoadingMore = false;
      return;
    }

    this.isLoadingMore = true;

    // Simulate server delay
    of(this.currentPage + 1)
      .pipe(
        delay(800),
        tap(() => (this.isLoadingMore = false))
      )
      .subscribe(() => {
        this.currentPage++;
        this.currentPageSubject.next(this.currentPage);
      });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  get hasMoreSpells(): boolean {
    const shown = this.currentPage * this.pageSize;

    return shown < this.filteredSpellsLength;
  }

  private filterSpells(
    spells: Spell[],
    name: string | null,
    types: string[],
    lights: string[],
    verbal: boolean | null
  ): Spell[] {
    return spells.filter(
      (spell) =>
        (!name ||
          spell.name?.toLowerCase().includes((name || '').toLowerCase()) ||
          spell.incantation
            ?.toLowerCase()
            .includes((name || '').toLowerCase()) ||
          spell.creator?.toLowerCase().includes((name || '').toLowerCase())) &&
        (types.length === 0 || types.includes(spell.type)) &&
        (lights.length === 0 || lights.includes(spell.light)) &&
        (!verbal || spell.canBeVerbal === true)
    );
  }
}
