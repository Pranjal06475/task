import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../components/navbar.component';
import { ProjectService, Project } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    
    <main class="min-h-screen bg-slate-50 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p class="text-slate-600 mt-2">Welcome back, {{ authService.currentUser()?.name }}</p>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-slate-600">Total Tasks</p>
                <p class="text-2xl font-bold text-slate-900 mt-2">{{ taskService.tasks().length }}</p>
              </div>
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-slate-600">In Progress</p>
                <p class="text-2xl font-bold text-slate-900 mt-2">{{ getTasksByStatus('In Progress').length }}</p>
              </div>
              <div class="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-slate-600">Completed</p>
                <p class="text-2xl font-bold text-slate-900 mt-2">{{ getTasksByStatus('Done').length }}</p>
              </div>
              <div class="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-slate-600">Projects</p>
                <p class="text-2xl font-bold text-slate-900 mt-2">{{ projectService.projects().length }}</p>
              </div>
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Recent Projects -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg border border-slate-200 shadow-sm">
              <div class="p-6 border-b border-slate-200 flex items-center justify-between">
                <h2 class="text-lg font-bold text-slate-900">Your Projects</h2>
                <a routerLink="/projects/new" class="text-sm font-medium text-primary-600 hover:text-primary-700">Create New</a>
              </div>
              <div *ngIf="projectService.projects().length > 0; else noProjects">
                <div class="divide-y divide-slate-200">
                  <div *ngFor="let project of projectService.projects()" class="p-6 hover:bg-slate-50 transition cursor-pointer">
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <h3 class="font-semibold text-slate-900">{{ project.name }}</h3>
                        <p class="text-sm text-slate-600 mt-1">{{ project.description }}</p>
                        <div class="flex items-center gap-4 mt-3">
                          <span class="text-xs font-medium text-slate-500">{{ project.members.length }} members</span>
                        </div>
                      </div>
                      <a [routerLink]="['/projects', project.id]" class="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700">View →</a>
                    </div>
                  </div>
                </div>
              </div>
              <ng-template #noProjects>
                <div class="p-12 text-center">
                  <svg class="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                  </svg>
                  <p class="text-slate-600">No projects yet. Create your first project to get started.</p>
                  <a routerLink="/projects/new" class="inline-block mt-4 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition">
                    Create Project
                  </a>
                </div>
              </ng-template>
            </div>
          </div>

          <!-- Task Status Breakdown -->
          <div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 class="text-lg font-bold text-slate-900 mb-6">Task Status</h2>
            <div class="space-y-4">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-medium text-slate-700">To Do</p>
                  <p class="text-sm font-bold text-slate-900">{{ getTasksByStatus('To Do').length }}</p>
                </div>
                <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div class="h-full bg-slate-400" [style.width.%]="getTaskProgress('To Do')"></div>
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-medium text-slate-700">In Progress</p>
                  <p class="text-sm font-bold text-slate-900">{{ getTasksByStatus('In Progress').length }}</p>
                </div>
                <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div class="h-full bg-warning-500" [style.width.%]="getTaskProgress('In Progress')"></div>
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-medium text-slate-700">Done</p>
                  <p class="text-sm font-bold text-slate-900">{{ getTasksByStatus('Done').length }}</p>
                </div>
                <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div class="h-full bg-success-500" [style.width.%]="getTaskProgress('Done')"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `
})
export class DashboardComponent implements OnInit {
  projectService = inject(ProjectService);
  taskService = inject(TaskService);
  authService = inject(AuthService);

  ngOnInit() {
    this.projectService.getProjects().subscribe();
    // In a real app, fetch tasks from all projects
  }

  getTasksByStatus(status: string) {
    return this.taskService.tasks().filter(t => t.status === status);
  }

  getTaskProgress(status: string): number {
    const total = this.taskService.tasks().length;
    if (total === 0) return 0;
    const count = this.getTasksByStatus(status).length;
    return (count / total) * 100;
  }
}
