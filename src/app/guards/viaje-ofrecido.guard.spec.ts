import { TestBed } from '@angular/core/testing';

import { ViajeOfrecidoGuard } from './viaje-ofrecido.guard';

describe('ViajeOfrecidoGuard', () => {
  let guard: ViajeOfrecidoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViajeOfrecidoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
