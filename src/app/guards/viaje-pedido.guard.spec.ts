import { TestBed } from '@angular/core/testing';

import { ViajePedidoGuard } from './viaje-pedido.guard';

describe('ViajePedidoGuard', () => {
  let guard: ViajePedidoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViajePedidoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
