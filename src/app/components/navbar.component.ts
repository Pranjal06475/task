import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <a routerLink="/dashboard" class="text-xl font-bold text-slate-900">TaskFlow</a>
          </div>

          <!-- Nav Links -->
          <div class="hidden md:flex items-center gap-8">
            <a routerLink="/dashboard" class="text-sm font-medium text-slate-600 hover:text-primary-600 transition">Dashboard</a>
            <a routerLink="/projects" class="text-sm font-medium text-slate-600 hover:text-primary-600 transition">Projects</a>
          </div>

          <!-- User Menu -->
          <div class="flex items-center gap-4">
            <div *ngIf="authService.currentUser()" class="text-sm">
              <p class="text-slate-900 font-medium">{{ authService.currentUser()?.name }}</p>
              <p class="text-slate-500 text-xs">{{ authService.currentUser()?.email }}</p>
            </div>
            <button 
              (click)="logout()"
              class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
