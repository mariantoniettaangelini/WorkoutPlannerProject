import { subscribeOn } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { WorkoutSessionService } from '../../Services/workout-session.service';
import { IExercise } from '../../Models/i-exercise';
import { IWorkoutSession } from '../../Models/i-workout-session';

@Component({
  selector: 'app-workout-session',
  templateUrl: './workout-session.component.html',
  styleUrl: './workout-session.component.scss'
})
export class WorkoutSessionComponent implements OnInit {
sessions: any[]=[];
filteredSessions: any[] = [];
types: string[] = [];
muscleGroups: string[] = [];
searchType: string = '';
searchMuscleGroup: string = '';
selectedSession: IWorkoutSession | null = null;

constructor(private workoutSessionService: WorkoutSessionService) {}
  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions():void{
    this.workoutSessionService.getWorkoutSessions().subscribe({
      next: (sessions) => {
        this.sessions = sessions;
        this.filteredSessions = sessions;
        this.populateDropdownOptions();
      },
      error: (error) => console.error('Errore caricamento sessioni', error)
    });
  }

  populateDropdownOptions(): void {
    this.types = [...new Set(this.sessions.map(session => session.type))];

    this.muscleGroups = [...new Set(
      this.sessions.flatMap(session => session.exercises.map((ex: IExercise) => ex.muscleGroup))
    )];
  }

  filterSessions(): void {
    this.filteredSessions = this.sessions.filter(session => {
      const typeMatches = this.searchType ? session.type === this.searchType : true;
      const muscleGroupMatches = this.searchMuscleGroup
        ? session.exercises.some((ex: IExercise) => ex.muscleGroup === this.searchMuscleGroup)
        : true;
      return typeMatches && muscleGroupMatches;
    });
  }

  openModal(session: IWorkoutSession): void {
    this.selectedSession = session;
  }

  closeModal() {
    this.selectedSession = null; // Rimuove la sessione selezionata e chiude il modale
  }
}
