import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {
  showNames: boolean = false;

  names: string[] = [
    'Sunil',
    'Rahul',
    'Mark',
    'John'
  ]

  constructor(public authService: AuthService) {}
  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get user() {
    return this.authService.getUser()
  }

  get buttonLabel() {
    return this.showNames ? 'Hide Names' : 'Show Names'
  }

  changeShowNames() {
    this.showNames = !this.showNames;
  }

  logout()  {
    this.authService.logout();
  }
}
