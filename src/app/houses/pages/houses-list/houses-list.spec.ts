import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesList } from './houses-list';

describe('HousesList', () => {
  let component: HousesList;
  let fixture: ComponentFixture<HousesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
