import { TestBed } from '@angular/core/testing';

import { MovieMusicService } from './movie-music.service';

describe('MovieMusicService', () => {
  let service: MovieMusicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieMusicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
