import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  currentIndex: number = 0;

  changeNext() {
    const items = document.querySelectorAll('.slider-title');
    items[this.currentIndex].classList.remove('active');
    this.currentIndex = (this.currentIndex + 1) % items.length;
    items[this.currentIndex].classList.add('active');
  }

  changePrev() {
    const items = document.querySelectorAll('.slider-title');
    items[this.currentIndex].classList.remove('active');
    this.currentIndex = (this.currentIndex - 1 + items.length) % items.length;
    items[this.currentIndex].classList.add('active');
  }
}
