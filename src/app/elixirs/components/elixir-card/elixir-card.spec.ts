import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElixirCard } from './elixir-card';
import { Elixir } from '../../types';

describe('ElixirCard', () => {
  let component: ElixirCard;
  let fixture: ComponentFixture<ElixirCard>;

  const elixirMock = {
    id: '1',
    effect: 'Test Effect',
    sideEffects: '',
    characteristics: '',
    time: '1 hour',
    name: 'Test Elixir',
    ingredients: [
      { id: '123', name: 'Ingredient 1' },
      { id: '312', name: 'Ingredient 2' },
    ],
    inventors: [
      { id: '1', firstName: 'John', lastName: 'Doe' },
      { id: '2', firstName: 'Jane', lastName: 'Smith' },
    ],
    difficulty: 'Moderate',
    manufacturer: 'Test Manufacturer',
  } as Elixir;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElixirCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ElixirCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display ingredients correctly', () => {
    component.elixir = { ...elixirMock };
    component.ngOnInit();
    expect((component as any).ingredients).toBe('Ingredient 1, Ingredient 2');
  });

  it('should display inventors correctly', () => {
    component.elixir = { ...elixirMock };
    component.ngOnInit();
    expect((component as any).inventors).toBe('John Doe, Jane Smith');
  });

  it('should handle empty elixir', () => {
    component.elixir = undefined as any; // Simulate no elixir input
    component.ngOnInit();
    expect((component as any).ingredients).toBe('');
    expect((component as any).inventors).toBe('');
  });
});
