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
    const items = document.querySelectorAll('.slider-data');
    const images = document.querySelectorAll('.image-data');

    items[this.currentIndex].classList.remove('active');
    images[this.currentIndex].classList.remove('img-active');

    this.currentIndex = (this.currentIndex + 1) % items.length;

    items[this.currentIndex].classList.add('active');
    images[this.currentIndex].classList.add('img-active');
  }

  changePrev() {
    const items = document.querySelectorAll('.slider-data');
    const images = document.querySelectorAll('.image-data');

    items[this.currentIndex].classList.remove('active');
    images[this.currentIndex].classList.remove('img-active');

    this.currentIndex = (this.currentIndex - 1 + items.length) % items.length;

    items[this.currentIndex].classList.add('active');
    images[this.currentIndex].classList.add('img-active');
  }

  showImage() {
    const images = document.querySelectorAll('.image-data');

    images[this.currentIndex].classList.remove('img-active');
    
    this.currentIndex = (this.currentIndex + 1 + images.length) % images.length;

    images[this.currentIndex].classList.add('img-active');
  }
}
