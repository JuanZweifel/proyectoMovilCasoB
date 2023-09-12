import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConductorViajePage } from './conductor-viaje.page';

describe('ConductorViajePage', () => {
  let component: ConductorViajePage;
  let fixture: ComponentFixture<ConductorViajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConductorViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
