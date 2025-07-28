import { Component, OnInit, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { catchError, finalize, of, BehaviorSubject } from 'rxjs';
import { Spells } from '../../services/spells';
import { CommonModule } from '@angular/common';
import { Spell } from '../../types';
import { isPlatformBrowser } from '@angular/common';
import { SpellCard } from '../../components/spell-card/spell-card';

@Component({
  selector: 'app-spells-list',
  imports: [CommonModule, SpellCard],
  templateUrl: './spells-list.html',
  styleUrl: './spells-list.scss',
})
export class SpellsList implements OnInit {
  private allSpells: Spell[] = [];
  private visibleSpellsSubject = new BehaviorSubject<Spell[]>([]);
  protected visibleSpells$ = this.visibleSpellsSubject.asObservable();
  private scrollHandler!: () => void;
  protected isLoadingMore = false;

  pageSize = 20;
  currentPage = 0;
  isLoading: boolean = true;
  error: boolean = false;

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
        this.loadMore();
      });
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
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const next = this.allSpells.slice(start, end);

    if (next.length > 0) {
      const current = this.visibleSpellsSubject.value;
      this.visibleSpellsSubject.next([...current, ...next]);
      this.currentPage++;
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }
}
