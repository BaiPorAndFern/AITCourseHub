import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow activation when the user is logged in', () => {
    // Mock `isLoggedIn` by mocking the behavior of `getToken`
    authService.getToken.and.returnValue('mock-token'); // Simulate a logged-in user

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    expect(authGuard.canActivate(route, state)).toBeTrue();
  });

  it('should deny activation when the user is not logged in', () => {
    // Mock `isLoggedIn` by simulating no token present
    authService.getToken.and.returnValue(null); // Simulate a logged-out user

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    spyOn(router, 'navigate'); // Spy on router navigation

    expect(authGuard.canActivate(route, state)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});