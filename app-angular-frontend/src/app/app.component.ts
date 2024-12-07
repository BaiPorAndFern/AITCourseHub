import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'front-end';
  message: any;
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']); // Redirect to login after logout
  }
  ngOnInit() {
    this.apiService.getMessage().subscribe((data) => {
      this.message = data;
    });
  }
}
