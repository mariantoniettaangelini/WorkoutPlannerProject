import { Component } from '@angular/core';
import { UserService } from '../../Services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isAuthenticated = false;

  constructor(private userSvc: UserService, private router: Router) {
    this.isAuthenticated = this.checkAuth();
    console.log('Utente autenticato:', this.isAuthenticated);
  }

  checkAuth(): boolean {
    return !!document.cookie
      .split(';')
      .some((item) => item.trim().startsWith('authToken'));
  }

  logout() {
    this.userSvc.logout().subscribe(
      () => {
        this.isAuthenticated = false;
        this.router.navigate(['/first-page']);
      },
      (err) => {
        console.error('errore nel logout', err);
      }
    );
  }
}
