import { UserService } from './Services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.userService.getProfile().subscribe();
  }

  title = 'WorkoutPlannerProject';

  constructor(private userService: UserService) {}
}
