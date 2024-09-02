import { UserService } from './../../Services/user-service.service';
import { Component } from '@angular/core';
import { ILoginViewModel } from '../../Models/i-login-view-model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-components',
  templateUrl: './login-components.component.html',
  styleUrl: './login-components.component.scss',
})
export class LoginComponent {
  loginData: ILoginViewModel = {
    email: '',
    password: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    this.userService.login(this.loginData).subscribe({
      next: (res) => {
        console.log('login avvenuto con successo', res);
      },
      error: (err) => {
        console.error('errore durante il login', err);
      },
    });
  }
}
