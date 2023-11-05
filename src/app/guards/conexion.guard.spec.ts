import { TestBed } from '@angular/core/testing';

import { ConexionGuard } from './conexion.guard';

describe('ConexionGuard', () => {
  let guard: ConexionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConexionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
