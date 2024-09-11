import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './UserComponents/login-components/login-components.component';
import { RegisterComponent } from './UserComponents/register/register.component';
import { ProfileComponent } from './UserComponents/profile/profile.component';
import { WorkoutSessionComponent } from './HomeComponents/workout-session/workout-session.component';
import { FirstPageComponent } from './HomeComponents/first-page/first-page.component';
import { HomeComponent } from './HomeComponents/home/home.component';
import { WorkoutDetailsComponent } from './HomeComponents/workout-details/workout-details.component';
import { ShopComponent } from './HomeComponents/shop/shop.component';
import { CartComponent } from './HomeComponents/cart/cart.component';

const routes: Routes = [
  { path: '', component: FirstPageComponent },  // Pagina iniziale
  { path: 'login', component: LoginComponent },  // Pagina di login
  { path: 'register', component: RegisterComponent },  // Pagina di registrazione
  { path: 'profile', component: ProfileComponent },
  { path: 'workouts', component: WorkoutSessionComponent },
  { path: 'workout/:id', component: WorkoutDetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent},
  { path: 'cart', component: CartComponent},  // Workouts page  // Pagina del profilo utente
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Fallback alla home page per percorsi sconosciuti
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
