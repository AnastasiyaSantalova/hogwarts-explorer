import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElixirCard } from './elixir-card';

describe('ElixirCard', () => {
  let component: ElixirCard;
  let fixture: ComponentFixture<ElixirCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElixirCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElixirCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
