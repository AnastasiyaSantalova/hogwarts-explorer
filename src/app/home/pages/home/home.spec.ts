import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the home page', () => {
    const home = fixture.nativeElement.querySelector('.home');
    expect(home).toBeTruthy();
  });

  it('should render the home page title', () => {
    const title = fixture.nativeElement.querySelector('h1');
    expect(title).toBeTruthy();
  });
});
