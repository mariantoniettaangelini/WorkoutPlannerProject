import { Component } from '@angular/core';
import { UserService } from '../../Services/user-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isAuthenticated = false;
  private authSubscription: Subscription;

  constructor(private userSvc: UserService, private router: Router) {
    this.authSubscription = this.userSvc.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
      console.log('utente autenticato', this.isAuthenticated);
    });
  }

  logout():void{
    this.userSvc.logout().subscribe(
      ()=>{
        this.router.navigate(['/first-page']);
      },
      (error)=>{
        console.error('errore nel logout', error);
      }
    );
  }
}
