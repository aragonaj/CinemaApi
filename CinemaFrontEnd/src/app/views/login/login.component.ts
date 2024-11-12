import { Component, inject } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/login';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private accessService = inject(AccessService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);
  public formLogin: FormGroup = this.formBuild.group({
    userEmail:['',Validators.required],
    password:['', Validators.required]
  })

  signIn(){
    if(this.formLogin.invalid) return;

    const objeto:Login = {
      userEmail: this.formLogin.value.userEmail,
      password: this.formLogin.value.password
    }

    this.accessService.login(objeto).subscribe({
      next:(data) => {
        if (data.isSuccess){
          localStorage.setItem("token",data.token);
          this.router.navigate(['home']);
        }
        else {
          alert("Wrong credentials")
        }
      },// next.end
      error:(error) => {
        console.log(error.message);
      }// error.end
    })// this.accessService.login(objeto).subscribe.end
  }// signIn.end

  register(){
    this.router.navigate(['register']);
  }
}// LoginComponent.end
