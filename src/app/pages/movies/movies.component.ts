import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Observable, combineLatest, map } from 'rxjs';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

/* 
This component creates a variables and methods for movies search component , with help of which movies are fetched and rendered 
in the component along with the pagination method.
*/

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, NgClass],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies$: Observable<any[]>;
  totalPages$: Observable<number>;
  currentPage$: Observable<number>;
  pageNumbers$: Observable<number[]>;
  userData: string | null = localStorage.getItem('user');
  parsedUser: any = this.userData ? JSON.parse(this.userData) : null;
  username: string = this.parsedUser?.name || " User";
  router = inject(Router);
  selectedType: string = '';
 

  constructor(private movieService: MovieService) {
    this.movies$ = this.movieService.movies$;
    this.totalPages$ = this.movieService.totalPages$;
    this.currentPage$ = this.movieService.currentPage$;

    this.pageNumbers$ = combineLatest([this.totalPages$, this.currentPage$]).pipe(
      map(([totalPages, currentPage]) => this.generatePageNumbers(totalPages, currentPage))
    );
  }

  ngOnInit(): void {
    this.movieService.fetchMovies(1);
  }

  fetchPage(page: number): void {
    this.movieService.fetchPage(page);
  }
  viewMovie(showId: string) {
    this.router.navigate(['/movies', showId]); 
  }
  searchMovies() {
    this.movieService.searchMovies('', this.selectedType);
    if (this.router.url !== '/movies') {
      this.router.navigate(['/movies']);
    }
  }
  setSelectedType(type: string): void {
    this.selectedType = type;
    this.searchMovies();
  }


  prevPage(): void {
    this.movieService.prevPage();
  }

  nextPage(): void {
    this.movieService.nextPage();
  }

  generatePageNumbers(totalPages: number, currentPage: number): number[] {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
}
