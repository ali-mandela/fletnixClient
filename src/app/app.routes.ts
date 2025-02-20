import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { MoviesComponent } from './pages/movies/movies.component';  
import { MoviesLayoutComponent } from './components/movies-layout/movies-layout.component';   
import { redirectIfLoggedInGuard } from './gaurd/redirect-if-logged-in.guard';
import { isLoggedInGuardGuard } from './gaurd/is-logged-in-guard.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent, canActivate: [redirectIfLoggedInGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [redirectIfLoggedInGuard] },
  {
    path: 'movies',
    component: MoviesLayoutComponent,
    canActivate: [isLoggedInGuardGuard], 
    children: [
      { path: '', component: MoviesComponent },
      { path: ':id', component: MovieDetailComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }  
];
