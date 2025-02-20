import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';  
import { MovieService } from '../../services/movie.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], 
  imports: [ NgIf, FormsModule, RouterModule] // Import only what is needed
})
export class HeaderComponent {
  searchQuery: string = '';
  selectedType: string = '';
  isMenuOpen: boolean = false; // Add missing property
  isSearchOpen: boolean = false; // Add missing search toggle property

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
    // Clear user token and redirect to login page
    localStorage.clear();
    this.router.navigate(['/signin']); // Redirect to login page
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Toggle the menu state
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen; // Toggle the search bar state
  }
}
