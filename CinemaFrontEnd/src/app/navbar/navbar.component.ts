import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccessService } from '../services/access.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  constructor(private _accessService: AccessService){}

  login(): boolean { 
    return this._accessService.isLoggedIn(); 
  }

  logout(): void { 
    this._accessService.logout(); 
  }
}
