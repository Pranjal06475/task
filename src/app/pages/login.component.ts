import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-slate-50 flex items-center justify-center px-4">
      <div class="w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
          <p class="text-slate-600">Sign in to your TaskFlow account</p>
        </div>

        <!-- Form -->
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              formControlName="email"
              placeholder="you&#64;example.com"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <p *ngIf="loginForm.get('email')?.hasError('required') && loginForm.get('email')?.touched" class="text-xs text-danger-500 mt-1">
              Email is required
            </p>
            <p *ngIf="loginForm.get('email')?.hasError('email') && loginForm.get('email')?.touched" class="text-xs text-danger-500 mt-1">
              Please enter a valid email
            </p>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input
              type="password"
              formControlName="password"
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <p *ngIf="loginForm.get('password')?.hasError('required') && loginForm.get('password')?.touched" class="text-xs text-danger-500 mt-1">
              Password is required
            </p>
          </div>

          <!-- Error Message -->
          <div *ngIf="errorMessage" class="p-3 bg-danger-50 border border-danger-200 rounded-lg">
            <p class="text-sm text-danger-700">{{ errorMessage }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="loginForm.invalid || isLoading"
            class="w-full py-2 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span *ngIf="isLoading">
              <svg class="animate-spin h-4 w-4" viewBox="0 0 50 50">
                <circle class="opacity-30" cx="25" cy="25" r="20" stroke="currentColor" stroke-width="5" fill="none"/>
                <circle cx="25" cy="25" r="20" stroke="currentColor" stroke-width="5" fill="none" stroke-dasharray="100" stroke-dashoffset="75"/>
              </svg>
            </span>
            {{ isLoading ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>

        <!-- Sign Up Link -->
        <div class="text-center mt-6">
          <p class="text-slate-600">
            Don't have an account?
            <a routerLink="/register" class="text-primary-600 hover:text-primary-700 font-medium">Sign up</a>
          </p>
        </div>

        <!-- TEMPORARY: Bypass login for development -->
        <button
          type="button"
          (click)="bypassLogin()"
          class="w-full mt-4 py-2 px-4 bg-slate-200 hover:bg-slate-300 text-slate-900 font-medium rounded-lg transition text-sm"
        >
          Skip to Dashboard (Temporary)
        </button>
      </div>
    </div>
  `
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = false;
  errorMessage = '';

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    // TEMPORARY: Hardcoded bypass credentials for development/testing
    if (email === 'admin@gmail.com' && password === '123321') {
      const tempUser = {
        id: 'admin-user-001',
        name: 'Admin User',
        email: 'admin@gmail.com'
      };
      const tempToken = 'admin-jwt-token-' + Date.now();

      localStorage.setItem('token', tempToken);
      localStorage.setItem('user', JSON.stringify(tempUser));

      this.authService.token.set(tempToken);
      this.authService.currentUser.set(tempUser);
      this.authService.isAuthenticated.set(true);

      this.router.navigate(['/dashboard']);
      return;
    }

    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';
      }
    });
  }

  // TEMPORARY: Bypass login for development/testing
  bypassLogin() {
    const tempUser = {
      id: 'temp-user-123',
      name: 'Demo User',
      email: 'demo@taskflow.app'
    };
    const tempToken = 'temp-jwt-token-' + Date.now();

    // Store in localStorage
    localStorage.setItem('token', tempToken);
    localStorage.setItem('user', JSON.stringify(tempUser));

    // Update auth service state
    this.authService.token.set(tempToken);
    this.authService.currentUser.set(tempUser);
    this.authService.isAuthenticated.set(true);

    // Navigate to dashboard
    this.router.navigate(['/dashboard']);
  }
}
