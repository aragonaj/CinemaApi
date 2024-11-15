import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isCollapsed = input.required<boolean>();

  changeCollapsedState = output<boolean>();

  toogleCollapsed():void {
    this.changeCollapsedState.emit(!this.isCollapsed());
  }

  closeSidenav():void {
    this.changeCollapsedState.emit(true);
  }

  items = [
    {
      routeLink: 'home',
      icon: 'fa-solid fa-house',
      label: 'Home'
    },
    {
      routeLink: 'country',
      icon: 'fa-solid fa-flag',
      label: 'Country'
    },
    {
      routeLink: 'director',
      icon: 'fa-solid fa-video',
      label: 'Director'
    },
    {
      routeLink: 'movie',
      icon: 'fa-solid fa-panorama',
      label: 'Movie'
    },
    {
      routeLink: 'movieDirector',
      icon: 'fa-solid fa-photo-film',
      label: 'Movies/Directors'
    },
    {
      routeLink: 'movieMusic',
      icon: 'fa-solid fa-play',
      label: 'Movies/Music'
    },
    {
      routeLink: 'music',
      icon: 'fa-solid fa-music',
      label: 'Music'
    },
  ]
}
