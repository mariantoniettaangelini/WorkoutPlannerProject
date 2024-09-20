import { IWorkoutSession } from './../../Models/i-workout-session';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutSessionService } from '../../Services/workout-session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrl: './workout-details.component.scss',
})
export class WorkoutDetailsComponent implements OnInit {
  workout: IWorkoutSession | null = null;
  currentExerciseIndex: number = 0;

  // Timer
  exerciseTime: number = 60;
  timeRemaining: number = 60;
  timerRunning: boolean = false;
  timerInterval: any;
  restTime: number = 30;

  // Animazione
  radius: number = 54;
  circumference: number = 2 * Math.PI * this.radius;
  offset: number = this.circumference;

  constructor(
    private route: ActivatedRoute,
    private workoutSessionSvc: WorkoutSessionService,
    private router: Router
  ) {}
  ngOnInit(): void {

    this.updateCircle();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.workoutSessionSvc.getWorkoutSessionById(Number(id)).subscribe(
          (workout) => {
            const exercisesContainer = (workout.exercises as any)?.$values;
            if (exercisesContainer) {
              this.workout = { ...workout, exercises: exercisesContainer };
            } else {
              this.workout = workout;
            }

            console.log('Workout recuperato:', this.workout);
            console.log('Esercizi associati:', this.workout.exercises);
          },
          (err) => {
            console.error('Errore nel recupero dei dettagli del workout', err);
          }
        );
      }
    });
  }

  startTimer(): void {
    if(!this.timerRunning) {
      this.timeRemaining = this.exerciseTime;
      this.timerRunning = true;
      this.timerInterval = setInterval(() => {
        if(this.timeRemaining > 0) {
          this.timeRemaining--;
          this.updateCircle();
        }
        else {
          this.stopTimer();
        }
      }, 1000);
    }
  }

  stopTimer():void {
    this.timerRunning = false;
    if(this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  resetTimer(): void {
    this.stopTimer();
    this.timeRemaining = this.exerciseTime;
    this.updateCircle();
  }

  updateCircle(): void {
    const progress = this.timeRemaining / this.exerciseTime;
    this.offset = this.circumference * (1 - progress);
  }

  previous(): void {
    if(this.currentExerciseIndex > 0) {
      this.resetTimer();
      this.currentExerciseIndex--;
    }
  }

  next(): void {
    if (this.workout && this.workout.exercises && this.currentExerciseIndex < this.workout.exercises.length - 1) {
      this.resetTimer();
      this.currentExerciseIndex++;
    }
  }

  chooseSession(): void {
    if (this.workout) {
      this.workoutSessionSvc.chooseSession(this.workout.id).subscribe(
        () => {
          this.stopTimer();
          Swal.fire({
            title: 'Successo!',
            text: 'I tuoi progressi sono stati aggiornati.',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'my-custom-button',
            },
          })
          .then(() => {
            this.router.navigate(['/profile']);
          });
        },
        (err) => {
          console.error('Errore', err);

          Swal.fire({
            title: 'Errore!',
            text: 'Si è verificato un errore',
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'my-custom-button',
            },
          });
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}
