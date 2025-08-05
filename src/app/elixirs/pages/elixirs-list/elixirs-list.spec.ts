import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElixirsList } from './elixirs-list';
import { provideHttpClient } from '@angular/common/http';

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
    const mockElixirs = [
      { id: '1', name: 'Elixir One' },
      { id: '2', name: 'Elixir Two' },
    ];
    spyOn((component as any).elixirsService, 'getElixirs').and.returnValue({
      pipe: () => ({
        subscribe: ({ next }: any) => next(mockElixirs),
      }),
    });
    (component as any).loadElixirs();
    expect((component as any).elixirs).toEqual(mockElixirs);
    expect((component as any).filteredElixirs).toEqual(mockElixirs);
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
    const filterInputs = {
      name: 'Elixir',
      difficulty: 'Moderate',
      ingredient: 'Ingredient',
      inventorFullName: 'Inventor',
      manufacturer: 'Manufacturer',
    };
    spyOn((component as any).elixirsService, 'getElixirs').and.returnValue({
      subscribe: (callback: any) =>
        callback([{ id: '1', name: 'Filtered Elixir' }]),
    });
    (component as any).filterElixirs(filterInputs);
    expect((component as any).filteredElixirs).toEqual([
      { id: '1', name: 'Filtered Elixir' },
    ]);
  });

  it('should update filter inputs when filterElixirs is called', () => {
    const filterInputs = {
      name: 'Test Elixir',
      difficulty: 'Moderate',
      ingredient: 'Test Ingredient',
      inventorFullName: 'John Doe',
      manufacturer: 'Test Manufacturer',
    };
    (component as any).filterElixirs(filterInputs);

    setTimeout(() => {
      expect((component as any).filterInputs).toEqual(filterInputs);
    }, 350); // Wait for debounce time
  });
});
