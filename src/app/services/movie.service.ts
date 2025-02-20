import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // private apiUrl = 'https://fletnixbackend-hgqr.onrender.com/api/movies/search';
  private baseAPIUrl = `${environment.baseApi}/movies/search`;
  

  private moviesSubject = new BehaviorSubject<any[]>([]);
  movies$ = this.moviesSubject.asObservable();

  private totalPagesSubject = new BehaviorSubject<number>(1);
  totalPages$ = this.totalPagesSubject.asObservable();

  private totalResultsSubject = new BehaviorSubject<number>(0);
  totalResults$ = this.totalResultsSubject.asObservable();

  private currentPageSubject = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPageSubject.asObservable();

  private searchQuery = '';
  private selectedType = '';
  private isLoading = false;
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  fetchMovies(page: number = 1) {
    if (this.isLoading) return;
    
    this.isLoading = true;
    const headers = this.getAuthHeaders();
    const url = `${this.baseAPIUrl}?query=${this.searchQuery}&type=${this.selectedType}&page=${page}`;

    this.http.get<any>(url, { headers }).pipe(
      tap(() => this.isLoading = false),
      catchError(error => {
        this.isLoading = false;
        console.error('Error fetching movies:', error);
        throw error;
      })
    ).subscribe(
      (response) => {
        if (response.success && response.data) {
          this.moviesSubject.next(response.data.movies);
          this.totalPagesSubject.next(response.data.totalPages || 1);
          this.totalResultsSubject.next(response.data.totalResults || 0);
          this.currentPageSubject.next(page);
        }
      }
    );
  }

  searchMovies(query: string, type: string) {
    this.searchQuery = query;
    this.selectedType = type;
    this.currentPageSubject.next(1);  
    this.fetchMovies(1);
  }

  fetchPage(page: number) {
    const totalPages = this.totalPagesSubject.getValue();
    if (page >= 1 && page <= totalPages) {
      this.fetchMovies(page);
    }
  }

  getCurrentPage(): number {
    return this.currentPageSubject.getValue();
  }

  prevPage() {
    const currentPage = this.getCurrentPage();
    const prevPage = currentPage - 1;
    if (prevPage >= 1 && !this.isLoading) {
      this.fetchMovies(prevPage);
    }
  }
  
  nextPage() {
    const currentPage = this.getCurrentPage();
    const totalPages = this.totalPagesSubject.getValue();
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages && !this.isLoading) {
      this.fetchMovies(nextPage);
    }
  }
}