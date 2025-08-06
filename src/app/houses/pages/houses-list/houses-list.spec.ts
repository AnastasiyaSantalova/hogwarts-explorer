import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesList } from './houses-list';
import { provideHttpClient } from '@angular/common/http';
import { MOCK_HOUSES } from '../../__mocks__/houses.mock';

describe('HousesList', () => {
  let component: HousesList;
  let fixture: ComponentFixture<HousesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousesList],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(HousesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty houses and loading state', () => {
    expect((component as any).houses).toEqual([]);
    expect((component as any).isLoading).toBeTrue();
    expect((component as any).error).toBeFalse();
  });

  it('should load houses on init', () => {
    spyOn(component as any, 'loadHouses').and.callThrough();
    component.ngOnInit();
    expect((component as any).loadHouses).toHaveBeenCalled();
  });

  it('should handle successful house loading', () => {
    spyOn((component as any).housesService, 'getHouses').and.returnValue({
      pipe: () => ({
        subscribe: ({ next }: any) => next(MOCK_HOUSES),
      }),
    });
    (component as any).loadHouses();
    expect((component as any).houses).toEqual(MOCK_HOUSES);
    expect((component as any).isLoading).toBeFalse();
    expect((component as any).error).toBeFalse();
  });

  it('should handle error during house loading', () => {
    spyOn(console, 'error');
    spyOn((component as any).housesService, 'getHouses').and.returnValue({
      pipe: () => ({
        subscribe: ({ next, error }: any) => {
          if (error) error(new Error('Load error'));
        },
      }),
    });
    (component as any).loadHouses();
    expect(console.error).toHaveBeenCalledWith(
      'Error loading houses:',
      jasmine.any(Error)
    );
    expect((component as any).isLoading).toBeFalse();
    expect((component as any).error).toBeTrue();
  });

  it('should render all houses', () => {
    (component as any).houses = [...MOCK_HOUSES];
    (component as any).isLoading = false;
    fixture.detectChanges();
    const houseElements = fixture.nativeElement.querySelectorAll('.house-card');
    expect(houseElements.length).toBe(MOCK_HOUSES.length);
  });
});
