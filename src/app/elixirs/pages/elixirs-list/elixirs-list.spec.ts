import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElixirsList } from './elixirs-list';
import { provideHttpClient } from '@angular/common/http';
import {
  MOCK_ELIXIR_1,
  MOCK_ELIXIR_FILTER_INPUTS,
  MOCK_ELIXIRS,
} from '../../__mocks__/elixirs.mock';

describe('ElixirsList', () => {
  let component: ElixirsList;
  let fixture: ComponentFixture<ElixirsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElixirsList],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ElixirsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty elixirs and loading state', () => {
    expect((component as any).elixirs).toEqual([]);
    expect((component as any).isLoading).toBeTrue();
    expect((component as any).error).toBeFalse();
  });

  it('should load elixirs on init', () => {
    spyOn(component as any, 'loadElixirs').and.callThrough();
    component.ngOnInit();
    expect((component as any).loadElixirs).toHaveBeenCalled();
  });

  it('should handle successful elixir loading', () => {
    spyOn((component as any).elixirsService, 'getElixirs').and.returnValue({
      pipe: () => ({
        subscribe: ({ next }: any) => next(MOCK_ELIXIRS),
      }),
    });
    (component as any).loadElixirs();
    expect((component as any).elixirs).toEqual(MOCK_ELIXIRS);
    expect((component as any).filteredElixirs).toEqual(MOCK_ELIXIRS);
    expect((component as any).isLoading).toBeFalse();
    expect((component as any).error).toBeFalse();
  });

  it('should handle error during elixir loading', () => {
    spyOn(console, 'error');
    spyOn((component as any).elixirsService, 'getElixirs').and.returnValue({
      pipe: () => ({
        subscribe: ({ next, error }: any) => {
          if (error) error(new Error('Load error'));
        },
      }),
    });
    (component as any).loadElixirs();
    expect(console.error).toHaveBeenCalledWith(
      'Error loading elixirs:',
      jasmine.any(Error)
    );
    expect((component as any).error).toBeTrue();
    expect((component as any).elixirs).toEqual([]);
    expect((component as any).filteredElixirs).toEqual([]);
    expect((component as any).isLoading).toBeFalse();
  });

  it('should filter elixirs based on filter inputs', () => {
    spyOn((component as any).elixirsService, 'getElixirs').and.callFake(
      (
        name: string,
        difficulty: string,
        ingredient: string,
        inventorFullName: string,
        manufacturer: string
      ) => ({
        subscribe: (callback: any) => {
          // Simulate filtering logic
          const filtered = MOCK_ELIXIRS.filter(
            (e) =>
              (!name || e.name === name) &&
              (!difficulty || e.difficulty === difficulty) &&
              (!ingredient ||
                e.ingredients.some((i) => i.name === ingredient)) &&
              (!inventorFullName ||
                e.inventors.some(
                  (inv) =>
                    `${inv.firstName} ${inv.lastName}` === inventorFullName
                )) &&
              (!manufacturer || e.manufacturer === manufacturer)
          );
          callback(filtered);
        },
      })
    );
    (component as any).filterElixirs(MOCK_ELIXIR_FILTER_INPUTS);
    expect((component as any).filteredElixirs).toEqual([{ ...MOCK_ELIXIR_1 }]);
  });

  it('should update filter inputs when filterElixirs is called', () => {
    (component as any).filterElixirs(MOCK_ELIXIR_FILTER_INPUTS);

    setTimeout(() => {
      expect((component as any).filterInputs).toEqual(
        MOCK_ELIXIR_FILTER_INPUTS
      );
    }, 350); // Wait for debounce time
  });
});
