import { UserService } from './../../Services/user-service.service';
import { Component } from '@angular/core';
import { IUser } from '../../Models/i-user';
import { IUserRegister } from '../../Models/i-user-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
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
    goals: ''
  };

  constructor(private userService: UserService){}

  register():void{
    this.userService.register(this.userData).subscribe({
      next:(user)=>console.log('registrazione avvenuta con successo', user),
      error:(error)=>console.error('errore durante la registrazione', error)
    });
  }

}
