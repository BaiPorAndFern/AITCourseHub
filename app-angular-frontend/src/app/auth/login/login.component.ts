import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title: string = "Student Login Form";
  credentials = {
    email: '',
    password: ''
  }

  constructor(
    public authService: AuthService
  ) {}
  onSubmit() {
    this.authService.login(this.credentials)
  }
}
