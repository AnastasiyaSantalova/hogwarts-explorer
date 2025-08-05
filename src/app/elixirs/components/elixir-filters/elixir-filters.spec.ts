import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElixirFilters } from './elixir-filters';

describe('ElixirFilters', () => {
  let component: ElixirFilters;
  let fixture: ComponentFixture<ElixirFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElixirFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElixirFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
