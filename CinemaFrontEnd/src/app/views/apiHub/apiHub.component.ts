import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { MainComponent } from "../../main/main.component";

@Component({
  selector: 'app-apiHub',
  standalone: true,
  imports: [ 
    RouterOutlet,
    SidebarComponent, 
    MainComponent],
  templateUrl: './apiHub.component.html',
  styleUrl: './apiHub.component.css'
})
export class ApiHubComponent implements OnInit {
  screenWidth = signal<number>(window.innerWidth);

  isCollapsed = signal<boolean>(false);

  changeCollapsedState(isCollapsed:boolean):void {
    this.isCollapsed.set(isCollapsed);
  }

  ngOnInit(): void {
    this.isCollapsed.set(this.screenWidth() < 768);
  }

  @HostListener('window:resize')
  onResize(){
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768){
      this.isCollapsed.set(true);
    }
  }
}
