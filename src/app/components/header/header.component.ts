// This file defines the header component, which includes a search bar, navigation menu, and logout functionality.
import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';  
import { MovieService } from '../../services/movie.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], 
  imports: [ NgIf, FormsModule, RouterModule] 
})
export class HeaderComponent {
  searchQuery: string = '';
  selectedType: string = '';
  isMenuOpen: boolean = false;   

  constructor(private movieService: MovieService, private router: Router) {}

  searchMovies() {
    this.movieService.searchMovies(this.searchQuery, this.selectedType);
    if (this.router.url !== '/movies') {
      this.router.navigate(['/movies']);
    }
  }

  nextPage() {
    this.movieService.nextPage();
  }

  prevPage() {
    this.movieService.prevPage();
  }

  logout() {
       localStorage.clear();
      this.router.navigate(['/signin']);  
  }

  toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen; 
  } 
}
