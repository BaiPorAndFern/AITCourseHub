import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'], // Fixed typo: styleUrl -> styleUrls
})
export class SuccessComponent implements OnInit, OnDestroy {
  // Countdown timer properties
  countdown: number = 5; // Countdown duration in seconds
  private intervalId: any;

  // Names display toggle
  showNames: boolean = false;
  names: string[] = ['Sunil', 'Rahul', 'Mark', 'John'];

  // Constructor to inject services
  constructor(public authService: AuthService, private router: Router) {}

  // Getters for template binding
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get user(): any {
    return this.authService.getUser();
  }

  get buttonLabel(): string {
    return this.showNames ? 'Hide Names' : 'Show Names';
  }

  // Lifecycle hooks
  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.clearCountdown();
  }

  // Methods
  goToChat(): void {
    this.clearCountdown(); // Clear the countdown timer
    this.router.navigate(['/chats']); // Navigate to chats
  }

  changeShowNames(): void {
    this.showNames = !this.showNames; // Toggle showNames state
  }

  // Countdown timer logic
  private startCountdown(): void {
    this.intervalId = setInterval(() => {
      this.countdown -= 1;
      if (this.countdown === 0) {
        this.clearCountdown();
        this.router.navigate(['/chats']); // Redirect to chats
      }
    }, 1000); // Update every second
  }

  private clearCountdown(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}