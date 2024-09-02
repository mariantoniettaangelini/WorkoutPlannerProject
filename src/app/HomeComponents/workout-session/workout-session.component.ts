import { Component, OnInit } from '@angular/core';
import { WorkoutSessionService } from '../../Services/workout-session.service';

@Component({
  selector: 'app-workout-session',
  templateUrl: './workout-session.component.html',
  styleUrl: './workout-session.component.scss'
})
export class WorkoutSessionComponent implements OnInit {
sessions: any[]=[];

constructor(private workoutSessionService: WorkoutSessionService) {}
  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions():void{
    this.workoutSessionService.getWorkoutSessions().subscribe({
      next:(sessions)=> this.sessions = sessions,
      error:(error)=> console.error('caricamento allenamenti fallito', error)
    });
  }

}
