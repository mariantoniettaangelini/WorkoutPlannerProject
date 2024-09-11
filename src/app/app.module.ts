import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './UserComponents/login-components/login-components.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './UserComponents/register/register.component';
import { ProfileComponent } from './UserComponents/profile/profile.component';
import { WorkoutSessionComponent } from './HomeComponents/workout-session/workout-session.component';
import { HttpClientModule } from '@angular/common/http';
import { FirstPageComponent } from './HomeComponents/first-page/first-page.component';
import { NavbarComponent } from './MainComponents/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './HomeComponents/home/home.component';
import { WorkoutDetailsComponent } from './HomeComponents/workout-details/workout-details.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ShopComponent } from './HomeComponents/shop/shop.component';
import { CartComponent } from './HomeComponents/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    WorkoutSessionComponent,
    FirstPageComponent,
    NavbarComponent,
    HomeComponent,
    WorkoutDetailsComponent,
    ShopComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    FormsModule,
    NgApexchartsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
