import { UserService } from './../../Services/user-service.service';
import { Component } from '@angular/core';
import { IUser } from '../../Models/i-user';
import { IUserRegister } from '../../Models/i-user-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']  // Correzione plurale
})
export class RegisterComponent {
  userData: IUserRegister = {
    email: '',
    password: '',
    name: '',
    gender: '',
    height: undefined,
    weight: undefined,
    experienceLevel: '',
    goals: []
  };

  currentStep:number = 1;

  selectGender(gender: string): void {
    this.userData.gender = gender;
  }

  selectExperience(experienceLevel: string): void {
    this.userData.experienceLevel = experienceLevel;
  }

  toggleGoal(goal: string): void {
    if (!this.userData.goals) {
      this.userData.goals = [];
    }

    const g = this.userData.goals.indexOf(goal);

    if (g > -1) {
      this.userData.goals.splice(g, 1);
    } else if (this.userData.goals.length < 2) {
      this.userData.goals.push(goal);
    }
  }

  constructor(private userService: UserService){}

  goToNextStep():void{
    this.currentStep++;
  }
register(): void {
  const userToRegister = {
    ...this.userData,
    goals: this.userData.goals,  };
  console.log('Dati inviati per la registrazione:', userToRegister);

  this.userService.register(this.userData).subscribe({
    next: (user) => console.log('registrazione avvenuta con successo', user),
    error: (error) => {
      console.error('Errore durante la registrazione', error);
      if (error.error?.errors) {
        // Logga gli errori specifici
        console.error('Dettagli dell\'errore di validazione:', error.error.errors);
      }
}});
}

}
