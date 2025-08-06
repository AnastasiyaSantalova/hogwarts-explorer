import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HouseCard } from './house-card';
import { MOCK_HOUSE_GRYFFINDOR } from '../../__mocks__/houses.mock';

describe('HouseCard', () => {
  let component: HouseCard;
  let fixture: ComponentFixture<HouseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseCard],
    }).compileComponents();

    fixture = TestBed.createComponent(HouseCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display house name', () => {
    component.house = { ...MOCK_HOUSE_GRYFFINDOR };
    fixture.detectChanges();
    const houseName = fixture.nativeElement.querySelector('.house-name');
    expect(houseName.textContent).toContain('Gryffindor');
  });

  it('should display house emblem', () => {
    component.house = { ...MOCK_HOUSE_GRYFFINDOR };
    fixture.detectChanges();
    const houseEmblem = fixture.nativeElement.querySelector('.house-image');
    expect(houseEmblem).toBeTruthy();
  });

  it('should handle empty house', () => {
    component.house = undefined as any;
    fixture.detectChanges();
    const houseName = fixture.nativeElement.querySelector('.house-name');
    expect(houseName).toBeNull();
  });

  it('should handle null house', () => {
    component.house = null as any;
    fixture.detectChanges();
    const houseName = fixture.nativeElement.querySelector('.house-name');
    expect(houseName).toBeNull();
  });

  it('should handle house with empty name', () => {
    component.house = { ...MOCK_HOUSE_GRYFFINDOR, name: '' };
    fixture.detectChanges();
    const houseName = fixture.nativeElement.querySelector('.house-name');
    expect(houseName.textContent).toBe('');
  });
});
