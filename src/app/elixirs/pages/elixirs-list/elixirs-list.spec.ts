import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElixirsList } from './elixirs-list';

describe('ElixirsList', () => {
  let component: ElixirsList;
  let fixture: ComponentFixture<ElixirsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElixirsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElixirsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
