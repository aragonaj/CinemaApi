import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {
  movies: any[] = []; constructor(private _movieService: MovieService) { }

  ngOnInit(): void {
    this._movieService.getList().subscribe((data) => {
      this.movies = data;
    });
  }

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

  showImage(index: number) {
    const items = document.querySelectorAll('.slider-data');
    const images = document.querySelectorAll('.image-data');

    items[this.currentIndex].classList.remove('active');
    images[this.currentIndex].classList.remove('img-active');

    this.currentIndex = index;

    items[this.currentIndex].classList.add('active');
    images[this.currentIndex].classList.add('img-active');
  }
}
