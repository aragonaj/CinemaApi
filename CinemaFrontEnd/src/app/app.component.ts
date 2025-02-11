import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  constructor(){}
  ngOnInit(): void{}
  
}