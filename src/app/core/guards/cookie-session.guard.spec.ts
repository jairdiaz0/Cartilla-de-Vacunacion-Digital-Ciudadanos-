import { TestBed } from '@angular/core/testing';

import { CookieSessionGuard } from './cookie-session.guard';

describe('CookieSessionGuard', () => {
  let guard: CookieSessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CookieSessionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
