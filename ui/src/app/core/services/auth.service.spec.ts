import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new AuthService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
