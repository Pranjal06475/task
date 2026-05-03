import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../components/navbar.component';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    
    <main class="min-h-screen bg-slate-50 pb-12">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-slate-900">Create New Project</h1>
          <p class="text-slate-600 mt-2">Set up a new project to collaborate with your team</p>
        </div>

        <!-- Form -->
        <div class="bg-white rounded-lg border border-slate-200 shadow-sm p-8">
          <form [formGroup]="projectForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Project Name -->
            <div>
              <label class="block text-sm font-semibold text-slate-900 mb-2">Project Name</label>
              <input
                type="text"
                formControlName="name"
                placeholder="e.g., Website Redesign"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p *ngIf="projectForm.get('name')?.hasError('required') && projectForm.get('name')?.touched" class="text-xs text-danger-500 mt-1">
                Project name is required
              </p>
              <p *ngIf="projectForm.get('name')?.hasError('minlength') && projectForm.get('name')?.touched" class="text-xs text-danger-500 mt-1">
                Project name must be at least 3 characters
              </p>
            </div>

            <!-- Project Description -->
            <div>
              <label class="block text-sm font-semibold text-slate-900 mb-2">Description</label>
              <textarea
                formControlName="description"
                placeholder="Describe what this project is about..."
                rows="5"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              ></textarea>
              <p *ngIf="projectForm.get('description')?.hasError('required') && projectForm.get('description')?.touched" class="text-xs text-danger-500 mt-1">
                Description is required
              </p>
              <p *ngIf="projectForm.get('description')?.hasError('minlength') && projectForm.get('description')?.touched" class="text-xs text-danger-500 mt-1">
                Description must be at least 10 characters
              </p>
            </div>

            <!-- Error Message -->
            <div *ngIf="errorMessage" class="p-4 bg-danger-50 border border-danger-200 rounded-lg">
              <p class="text-sm text-danger-700">{{ errorMessage }}</p>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-4 pt-6 border-t border-slate-200">
              <button
                type="submit"
                [disabled]="projectForm.invalid || isLoading"
                class="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span *ngIf="isLoading">
                  <svg class="animate-spin h-4 w-4" viewBox="0 0 50 50">
                    <circle class="opacity-30" cx="25" cy="25" r="20" stroke="currentColor" stroke-width="5" fill="none"/>
                    <circle cx="25" cy="25" r="20" stroke="currentColor" stroke-width="5" fill="none" stroke-dasharray="100" stroke-dashoffset="75"/>
                  </svg>
                </span>
                {{ isLoading ? 'Creating...' : 'Create Project' }}
              </button>
              <a routerLink="/projects" class="px-8 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 font-medium rounded-lg transition">
                Cancel
              </a>
            </div>
          </form>
        </div>

        <!-- Info Box -->
        <div class="mt-8 p-6 bg-primary-50 border border-primary-200 rounded-lg">
          <h3 class="font-semibold text-primary-900 mb-2">Creating a project</h3>
          <ul class="text-sm text-primary-700 space-y-1">
            <li>✓ You'll be set as the project admin</li>
            <li>✓ You can invite team members after creation</li>
            <li>✓ Start creating tasks right away</li>
          </ul>
        </div>
      </div>
    </main>
  `
})
export class CreateProjectComponent {
  private projectService = inject(ProjectService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  projectForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]]
  });

  isLoading = false;
  errorMessage = '';

  onSubmit() {
    if (this.projectForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { name, description } = this.projectForm.value;

    this.projectService.createProject(name!, description!).subscribe({
      next: (project) => {
        this.isLoading = false;
        this.router.navigate(['/projects', project.id]);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to create project. Please try again.';
      }
    });
  }
}
