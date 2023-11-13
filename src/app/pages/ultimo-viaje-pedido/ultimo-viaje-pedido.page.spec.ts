import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UltimoViajePedidoPage } from './ultimo-viaje-pedido.page';

describe('UltimoViajePedidoPage', () => {
  let component: UltimoViajePedidoPage;
  let fixture: ComponentFixture<UltimoViajePedidoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UltimoViajePedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
