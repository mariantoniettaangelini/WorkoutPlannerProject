import { Component, OnInit } from '@angular/core';
import { WorkoutSessionService } from '../../Services/workout-session.service';
import { IUser } from '../../Models/i-user';
import { UserService } from '../../Services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  recommendedWorkouts: any[] = [];
  user: IUser | null = null;

  constructor(
    private workoutSessionSvc: WorkoutSessionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.getRecommendedWorkouts();
      }
    });
  }

  getRecommendedWorkouts(): void {
    if (!this.user || !this.user.experienceLevel) return;

    this.workoutSessionSvc.getWorkoutSessions().subscribe(
      (workouts: any[]) => {
        this.recommendedWorkouts = workouts.filter((workout) => {
          return (
            workout.level &&
            this.user!.experienceLevel &&
            workout.level.toLowerCase() ===
              this.user!.experienceLevel.toLowerCase()
          );
        });
      },
      (err) => {
        console.error('Errore nel recupero dei workout consigliati', err);
      }
    );
  }

  chooseSession(id: number): void {
    this.workoutSessionSvc.chooseSession(id).subscribe(
      () => {
        console.log('Workout scelto con successo.');
      },
      (err) => {
        console.error('Errore durante la scelta del workout', err);
      }
    );
  }
}
