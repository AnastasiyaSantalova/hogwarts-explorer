import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

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
    const title = fixture.nativeElement.querySelector('.home-page-header');
    expect(title).toBeTruthy();
  });

  it('should have a non-empty home page title', () => {
    const title = fixture.nativeElement.querySelector('.home-page-header');
    expect(title.textContent).not.toBe('');
  });

  it('should render the home page description', () => {
    const description = fixture.nativeElement.querySelector(
      '.home-page-description'
    );
    expect(description).toBeTruthy();
  });

  it('should have a non-empty home page description', () => {
    const description = fixture.nativeElement.querySelector(
      '.home-page-description'
    );
    expect(description.textContent).not.toBe('');
  });

  it('should render the home page image', () => {
    const image = fixture.nativeElement.querySelector('.home-image');
    expect(image).toBeTruthy();
  });
});
