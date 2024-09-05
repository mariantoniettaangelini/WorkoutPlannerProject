import { Component, OnInit } from '@angular/core';
import { IUser } from '../../Models/i-user';
import { UserService } from '../../Services/user-service.service';
import { subscribeOn } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: IUser | null = null;
  progress: any[] = [];
  profileImageUrl: string = '';

  public chartOptions: Partial<ChartOptions> | any;

  ngOnInit(): void {
    this.loadProfile();
    this.loadProgress();
  }
  constructor(private userService: UserService) {}

  loadProfile(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
        console.log('Profilo caricato con successo', user);
        if (this.user?.gender?.toLowerCase() === 'male') {
          this.profileImageUrl = '/assets/img/profile-male.jpg';
        } else if (this.user?.gender?.toLowerCase() === 'female') {
          this.profileImageUrl = '/assets/img/profile-female.jpg';
        }
      },
      error: (error) => {
        console.error('Errore nel caricamento del profilo', error);
      },
    });
  }

  loadProgress(): void {
    this.userService.getProgress().subscribe({
      next: (progress) => {
        console.log('Dati di progresso ricevuti:', progress);
        this.progress = progress;
        console.log('Progressi salvati con successo', this.progress);
        this.setupChart();
      },
      error: (err) =>
        console.error('Errore nel caricamento dei progressi', err),
    });
  }

  // dati per il grafico
  setupChart(): void {
    const workoutTypes: { [key: string]: number } = {};

    this.progress.forEach((p) => {
      const workoutType = p.workoutSession?.type;
      if (workoutType) {
        workoutTypes[workoutType] = (workoutTypes[workoutType] || 0) + 1;
      }
    });

    this.chartOptions = {
      series: Object.values(workoutTypes),
      chart: {
        type: 'pie',
      },
      labels: Object.keys(workoutTypes),
      colors: ['#FF5470', '#4CA1A3', '#FFEBEE', '#E1E1E1', '#666'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
}
