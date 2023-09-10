import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfrecerViajePage } from './ofrecer-viaje.page';

describe('OfrecerViajePage', () => {
  let component: OfrecerViajePage;
  let fixture: ComponentFixture<OfrecerViajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OfrecerViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
