import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from "../../dashboard/dashboard.component";

@Component({
  selector: 'app-apiHub',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, DashboardComponent],
  templateUrl: './apiHub.component.html',
  styleUrl: './apiHub.component.css'
})
export class ApiHubComponent {

}
