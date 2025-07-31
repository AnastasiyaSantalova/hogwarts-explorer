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
} from 'rxjs';
import { SpellCard } from '../../components/spell-card/spell-card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
  ],
  templateUrl: './spells-list.html',
  styleUrl: './spells-list.scss',
})
export class SpellsList implements OnInit {
  private allSpells: Spell[] = [];
  protected filteredSpells$!: Observable<Spell[]>;
  private scrollHandler!: () => void;
  protected isLoadingMore = false;

  // Filters
  protected nameFilter = new FormControl<string>('');
  protected typeFilter = new FormControl<string[]>([]);
  protected lightFilter = new FormControl<string[]>([]);
  protected canBeVerbalFilter = new FormControl<boolean>(false);

  protected pageSize = 24;
  protected currentPage = 0;
  protected isLoading: boolean = true;
  protected error: boolean = false;
  protected uniqueTypes: string[] = [];
  protected uniqueLights: string[] = [];

  constructor(
    private spellsService: Spells,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        this.scrollHandler = this.onScroll.bind(this);
        window.addEventListener('scroll', this.scrollHandler);
      });
    }
    this.spellsService
      .getSpells()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        catchError(() => {
          this.error = true;
          return of([]);
        })
      )
      .subscribe((data) => {
        this.allSpells = [...data] as Spell[];
        this.currentPage = 1;
      });

      this.filteredSpells$ = combineLatest([
        of(this.allSpells),
        this.nameFilter.valueChanges.pipe(startWith(''), debounceTime(200)),
        this.typeFilter.valueChanges.pipe(startWith([])),
        this.lightFilter.valueChanges.pipe(startWith([])),
        this.canBeVerbalFilter.valueChanges.pipe(startWith(false)),
      ]).pipe(
        map(([spells, name, types, lights, verbal]) => {
          const typeArray = types as string[];
          const lightArray = lights as string[];

          const filtered = spells.filter(
            (spell) =>
              (!name ||
                spell.name?.toLowerCase().includes((name || '').toLowerCase()) ||
                spell.incantation?.toLowerCase().includes((name || '').toLowerCase())||
                spell.creator?.toLowerCase().includes((name || '').toLowerCase())) &&
              (typeArray.length === 0 || typeArray.includes(spell.type)) &&
              (lightArray.length === 0 || lightArray.includes(spell.light)) &&
              (!verbal || spell.canBeVerbal === true)
          );

          return filtered.slice(0, this.currentPage * this.pageSize);
        })
      );

    this.uniqueTypes = [...new Set(this.allSpells.map((spell) => spell.type))].filter(Boolean);
    this.uniqueLights = [...new Set(this.allSpells.map((spell) => spell.light))].filter(Boolean);
  }

  private onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const scrollPos = window.innerHeight + window.scrollY;
    const max = document.documentElement.scrollHeight;

    if (scrollPos >= max - 200 && !this.isLoadingMore) {
      this.isLoadingMore = true;

      this.zone.run(() => {
        this.loadMore();
        this.isLoadingMore = false;
      });
    }
  }

  loadMore(): void {
    this.currentPage++;
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }
}
