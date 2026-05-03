import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../components/navbar.component';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    
    <main class="min-h-screen bg-slate-50 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-slate-900">Projects</h1>
            <p class="text-slate-600 mt-2">Manage and organize your team projects</p>
          </div>
          <a routerLink="/projects/new" class="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            New Project
          </a>
        </div>

        <!-- Projects Grid -->
        <div *ngIf="projectService.projects().length > 0; else noProjects" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let project of projectService.projects()" class="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-lg transition overflow-hidden">
            <!-- Project Header -->
            <div class="p-6 border-b border-slate-200 bg-gradient-to-r from-primary-50 to-slate-50">
              <div class="flex items-start justify-between mb-2">
                <h2 class="text-lg font-bold text-slate-900 flex-1">{{ project.name }}</h2>
              </div>
              <p class="text-sm text-slate-600">{{ project.description }}</p>
            </div>

            <!-- Project Stats -->
            <div class="p-6 space-y-4 border-b border-slate-200">
              <div class="flex items-center justify-between">
                <span class="text-sm text-slate-600">Members</span>
                <span class="font-semibold text-slate-900">{{ project.members.length }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-xs text-slate-500">Created {{ formatDate(project.createdAt) }}</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="p-6 flex items-center gap-3">
              <a [routerLink]="['/projects', project.id]" class="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition text-center text-sm">
                View Project
              </a>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <ng-template #noProjects>
          <div class="bg-white rounded-lg border border-slate-200 shadow-sm p-12 text-center">
            <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">No projects yet</h3>
            <p class="text-slate-600 mb-6">Create your first project to start collaborating with your team.</p>
            <a routerLink="/projects/new" class="inline-block px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition">
              Create First Project
            </a>
          </div>
        </ng-template>
      </div>
    </main>
  `
})
export class ProjectsComponent implements OnInit {
  projectService = inject(ProjectService);

  ngOnInit() {
    this.projectService.getProjects().subscribe();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }
}
