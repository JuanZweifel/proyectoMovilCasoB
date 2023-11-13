import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UltimoViajeOfrecidoPage } from './ultimo-viaje-ofrecido.page';

describe('UltimoViajeOfrecidoPage', () => {
  let component: UltimoViajeOfrecidoPage;
  let fixture: ComponentFixture<UltimoViajeOfrecidoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UltimoViajeOfrecidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
