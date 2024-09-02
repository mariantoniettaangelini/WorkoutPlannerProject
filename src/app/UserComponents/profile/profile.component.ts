import { Component, OnInit } from '@angular/core';
import { IUser } from '../../Models/i-user';
import { UserService } from '../../Services/user-service.service';
import { subscribeOn } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit  {
  user:IUser | null = null;
  progress:any[] = [];
  profileImageUrl: string = '';

  ngOnInit(): void {
    this.loadProfile();
    this.loadProgress();
  }
  constructor(private userService:UserService) {}

  loadProfile(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
        console.log('Profilo caricato con successo', user);
      },
      error: (error) => {
        console.error('Errore nel caricamento del profilo', error);
      }
    });
  }

  loadProgress():void {
    this.userService.getProgress().subscribe({
      next:(progress)=> this.progress = this.progress,
      error:(error)=> console.error('errore', error)
    });
  }

  setProfileImg(): void {
    if (this.user?.gender?.toLowerCase() === 'male') {
      this.profileImageUrl = '/assets/img/profile-male.jpg';
    } else if (this.user?.gender?.toLowerCase() === 'female') {
      this.profileImageUrl = '/assets/img/profile-female.jpg';
    }
  }
}
