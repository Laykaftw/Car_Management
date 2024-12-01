import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { carGuard } from './car.guard';

describe('carGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => carGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
