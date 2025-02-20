import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  NgForOf, NgIf } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie-detail',
  imports:[NgIf,NgForOf],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  showId: string | null = null;
  movie: any = null; 
  baseAPIUrl:any = environment['baseApi']; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.showId = this.route.snapshot.paramMap.get('id');

    if (this.showId) {
      this.fetchMovieDetails();
    }
  }

  fetchMovieDetails() {
    const token = localStorage.getItem('token');   
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>(`${this.baseAPIUrl}/movies/${this.showId}`, { headers }).subscribe({
      next: (response) => {
        if (response.success) {
          this.movie = response.data; 
          
        } else {
          console.error('Error:', response.message);
        }
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/movies']);
  }
}
