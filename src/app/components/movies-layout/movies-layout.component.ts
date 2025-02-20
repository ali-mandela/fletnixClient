import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-movies-layout',
  imports: [HeaderComponent, FooterComponent,RouterOutlet,],
  templateUrl: './movies-layout.component.html',
  styleUrl: './movies-layout.component.css'
})
export class MoviesLayoutComponent {

}
