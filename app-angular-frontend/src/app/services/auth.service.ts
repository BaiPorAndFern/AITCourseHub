import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient, private router: Router) {}

  get isLoggedIn() {
    return !!this.getUser();
  }

  getUser() {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
  }

  getToken() {
    const token = localStorage.getItem("token")
  
    return token ? JSON.parse(token) : null
   }

  // Method to register a new user
  register(userData: any): void {
    this.http.post(`${this.baseUrl}/register`, userData).subscribe({
      next: (response: any) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', JSON.stringify(response.token));

        this.router.navigate(['/success']);
      },
      error: () => {
        console.log('Failed registration');
      },
    });
  }

  // Method to log in a user
  login(credentials: { email: string; password: string }): void {
    this.http.post(`${this.baseUrl}/login`, credentials).subscribe({
      next: (response: any) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', JSON.stringify(response.token));

        this.router.navigate(['/success']);
      },
      error: () => {
        console.log('Invalid credentials');
      },
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // this.http{"logout"}
    this.router.navigate(['/login']);
  }
}
