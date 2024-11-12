import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccessService } from '../../services/access.service';
import { Router } from '@angular/router';
import { ApiUser } from '../../interfaces/apiUser';

import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  private accessService = inject(AccessService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);
  public formRegister: FormGroup = this.formBuild.group({
    userName:['', Validators.required],
    userEmail:['', Validators.required],
    password:['', Validators.required]
  })

  register(){
    if (this.formRegister.invalid) return;

    const objeto:ApiUser = {
      userName: this.formRegister.value.userName,
      userEmail: this.formRegister.value.userEmail,
      password: this.formRegister.value.password
    }

    this.accessService.register(objeto).subscribe({
      next: (data) => {
        if (data.isSuccess){
          this.router.navigate([''])
        }// if.end
        else {
          alert("Register failed")
        }
      },// next.end
      error:(error) => {
        console.log(error.message);
      }// error.end
    })// subscribe.end
  }// register.end

  back(){
    this.router.navigate(['home'])
  }
}// RegisterComponent.end
