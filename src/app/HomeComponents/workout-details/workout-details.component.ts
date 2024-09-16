import { IWorkoutSession } from './../../Models/i-workout-session';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutSessionService } from '../../Services/workout-session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrl: './workout-details.component.scss',
})
export class WorkoutDetailsComponent implements OnInit {
  workout: IWorkoutSession | null = null;

  constructor(
    private route: ActivatedRoute,
    private workoutSessionSvc: WorkoutSessionService
  ) {}
  ngOnInit(): void {
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

  chooseSession(): void {
    if (this.workout) {
      this.workoutSessionSvc.chooseSession(this.workout.id).subscribe(
        () => {
          Swal.fire({
            title: 'Successo!',
            text: 'I tuoi progressi sono stati aggiornati.',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'my-custom-button',
            },
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
}
