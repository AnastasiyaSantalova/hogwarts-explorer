import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElixirCard } from './elixir-card';
import { MOCK_ELIXIR_1 } from '../../__mocks__/elixirs.mock';

describe('ElixirCard', () => {
  let component: ElixirCard;
  let fixture: ComponentFixture<ElixirCard>;

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
    component.elixir = { ...MOCK_ELIXIR_1 };
    component.ngOnInit();
    expect((component as any).ingredients).toBe('Ingredient 1, Ingredient 2');
  });

  it('should display inventors correctly', () => {
    component.elixir = { ...MOCK_ELIXIR_1 };
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
