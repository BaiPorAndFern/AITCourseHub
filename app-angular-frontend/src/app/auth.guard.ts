import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './services/auth.service'; // Assuming AuthService has isLoggedIn method

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  // Utility to safely access localStorage
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  // Get user from localStorage
  getUser(): any {
    if (this.isBrowser()) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  // Check if user is logged in
  get isLoggedIn(): boolean {
    if (this.isBrowser()) {
      return !!localStorage.getItem('token'); // Example: token presence means logged in
    }
    return false;
  }

  // Set token in localStorage
  setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
  }

  // Remove token from localStorage
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
  }
}
