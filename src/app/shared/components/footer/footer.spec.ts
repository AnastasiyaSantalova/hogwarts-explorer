import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the footer', () => {
    const footer = fixture.nativeElement.querySelector('.footer');
    expect(footer).toBeTruthy();
  });

  it('should render the footer text', () => {
    const footerText = fixture.nativeElement.querySelector('.footer-text');
    expect(footerText).toBeTruthy();
  });
});
