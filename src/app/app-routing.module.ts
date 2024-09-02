import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './UserComponents/login-components/login-components.component';
import { RegisterComponent } from './UserComponents/register/register.component';
import { ProfileComponent } from './UserComponents/profile/profile.component';
import { WorkoutSessionComponent } from './HomeComponents/workout-session/workout-session.component';
import { FirstPageComponent } from './HomeComponents/first-page/first-page.component';

const routes: Routes = [
  { path: '', component: FirstPageComponent },  // Pagina iniziale
  { path: 'login', component: LoginComponent },  // Pagina di login
  { path: 'register', component: RegisterComponent },  // Pagina di registrazione
  { path: 'profile', component: ProfileComponent },
  { path: 'workouts', component: WorkoutSessionComponent }, // Workouts page  // Pagina del profilo utente
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Fallback alla home page per percorsi sconosciuti
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
