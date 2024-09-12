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
import { authGuard } from './Auth/auth.guard';

const routes: Routes = [
  { path: '', component: FirstPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'workouts', component: WorkoutSessionComponent, canActivate: [authGuard] },
  { path: 'workout/:id', component: WorkoutDetailsComponent, canActivate: [authGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
