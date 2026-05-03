import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
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
          <h1 class="text-3xl font-bold text-slate-900 mb-2">Create account</h1>
          <p class="text-slate-600">Join TaskFlow to start managing your projects</p>
        </div>

        <!-- Form -->
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              formControlName="name"
              placeholder="John Doe"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <p *ngIf="registerForm.get('name')?.hasError('required') && registerForm.get('name')?.touched" class="text-xs text-danger-500 mt-1">
              Name is required
            </p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              formControlName="email"
              placeholder="you&#64;example.com"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <p *ngIf="registerForm.get('email')?.hasError('required') && registerForm.get('email')?.touched" class="text-xs text-danger-500 mt-1">
              Email is required
            </p>
            <p *ngIf="registerForm.get('email')?.hasError('email') && registerForm.get('email')?.touched" class="text-xs text-danger-500 mt-1">
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
            <p *ngIf="registerForm.get('password')?.hasError('required') && registerForm.get('password')?.touched" class="text-xs text-danger-500 mt-1">
              Password is required
            </p>
            <p *ngIf="registerForm.get('password')?.hasError('minlength') && registerForm.get('password')?.touched" class="text-xs text-danger-500 mt-1">
              Password must be at least 6 characters
            </p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
            <input
              type="password"
              formControlName="confirmPassword"
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <p *ngIf="registerForm.get('confirmPassword')?.hasError('required') && registerForm.get('confirmPassword')?.touched" class="text-xs text-danger-500 mt-1">
              Please confirm your password
            </p>
            <p *ngIf="registerForm.hasError('passwordMismatch') && registerForm.get('confirmPassword')?.touched" class="text-xs text-danger-500 mt-1">
              Passwords do not match
            </p>
          </div>

          <!-- Error Message -->
          <div *ngIf="errorMessage" class="p-3 bg-danger-50 border border-danger-200 rounded-lg">
            <p class="text-sm text-danger-700">{{ errorMessage }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="registerForm.invalid || isLoading"
            class="w-full py-2 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span *ngIf="isLoading">
              <svg class="animate-spin h-4 w-4" viewBox="0 0 50 50">
                <circle class="opacity-30" cx="25" cy="25" r="20" stroke="currentColor" stroke-width="5" fill="none"/>
                <circle cx="25" cy="25" r="20" stroke="currentColor" stroke-width="5" fill="none" stroke-dasharray="100" stroke-dashoffset="75"/>
              </svg>
            </span>
            {{ isLoading ? 'Creating account...' : 'Create account' }}
          </button>
        </form>

        <!-- Sign In Link -->
        <div class="text-center mt-6">
          <p class="text-slate-600">
            Already have an account?
            <a routerLink="/login" class="text-primary-600 hover:text-primary-700 font-medium">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  isLoading = false;
  errorMessage = '';

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { name, email, password } = this.registerForm.value;

    this.authService.register(name!, email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
