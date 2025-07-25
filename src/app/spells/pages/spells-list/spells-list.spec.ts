import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellsList } from './spells-list';

describe('SpellsList', () => {
  let component: SpellsList;
  let fixture: ComponentFixture<SpellsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpellsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpellsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
