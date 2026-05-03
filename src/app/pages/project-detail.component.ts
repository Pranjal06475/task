import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../components/navbar.component';
import { ProjectService, Project } from '../services/project.service';
import { TaskService, Task, TaskStatus } from '../services/task.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    
    <main class="min-h-screen bg-slate-50 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div *ngIf="projectService.currentProject()" class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h1 class="text-3xl font-bold text-slate-900">{{ projectService.currentProject()!.name }}</h1>
              <p class="text-slate-600 mt-2">{{ projectService.currentProject()!.description }}</p>
            </div>
            <button (click)="showCreateTask = !showCreateTask" class="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              New Task
            </button>
          </div>

          <!-- Members -->
          <div class="flex items-center gap-2 mt-4">
            <span class="text-sm font-medium text-slate-600">Team Members:</span>
            <div class="flex items-center gap-2">
              <span *ngFor="let member of projectService.currentProject()!.members" class="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                {{ member.role }}
              </span>
            </div>
          </div>
        </div>

        <!-- Create Task Form -->
        <div *ngIf="showCreateTask" class="bg-white rounded-lg border border-slate-200 p-6 mb-8 shadow-sm">
          <h2 class="text-lg font-bold text-slate-900 mb-4">Create New Task</h2>
          <form (ngSubmit)="createTask()" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Task Title</label>
                <input
                  type="text"
                  [(ngModel)]="taskForm.title"
                  name="title"
                  placeholder="Enter task title"
                  class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                <select
                  [(ngModel)]="taskForm.priority"
                  name="priority"
                  class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                [(ngModel)]="taskForm.description"
                name="description"
                placeholder="Enter task description"
                rows="3"
                class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              ></textarea>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Due Date</label>
                <input
                  type="date"
                  [(ngModel)]="taskForm.dueDate"
                  name="dueDate"
                  class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Assign To</label>
                <input
                  type="text"
                  [(ngModel)]="taskForm.assignedTo"
                  name="assignedTo"
                  placeholder="User ID"
                  class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div class="flex gap-3">
              <button
                type="submit"
                class="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition"
              >
                Create Task
              </button>
              <button
                type="button"
                (click)="showCreateTask = false"
                class="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 font-medium rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <!-- Task Board (Kanban) -->
        <div *ngIf="projectService.currentProject()" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- To Do Column -->
          <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div class="p-4 bg-slate-50 border-b border-slate-200">
              <h3 class="font-semibold text-slate-900 flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-slate-400"></span>
                To Do
                <span class="ml-auto text-xs font-bold text-slate-500">{{ getTasksByStatus('To Do').length }}</span>
              </h3>
            </div>
            <div class="p-4 space-y-3 min-h-96">
              <div *ngFor="let task of getTasksByStatus('To Do')" class="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition cursor-pointer">
                <p class="font-medium text-slate-900">{{ task.title }}</p>
                <p class="text-xs text-slate-600 mt-1">{{ task.description }}</p>
                <div class="flex items-center gap-2 mt-3">
                  <span [ngClass]="getPriorityClass(task.priority)" class="px-2 py-1 rounded text-xs font-medium">
                    {{ task.priority }}
                  </span>
                  <span class="text-xs text-slate-500 ml-auto">{{ formatDate(task.dueDate) }}</span>
                </div>
                <button (click)="updateTaskStatus(task, 'In Progress')" class="w-full mt-3 py-1 text-xs font-medium text-primary-600 hover:text-primary-700 border border-primary-200 rounded transition">
                  Move to In Progress
                </button>
              </div>
            </div>
          </div>

          <!-- In Progress Column -->
          <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div class="p-4 bg-slate-50 border-b border-slate-200">
              <h3 class="font-semibold text-slate-900 flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-warning-400"></span>
                In Progress
                <span class="ml-auto text-xs font-bold text-slate-500">{{ getTasksByStatus('In Progress').length }}</span>
              </h3>
            </div>
            <div class="p-4 space-y-3 min-h-96">
              <div *ngFor="let task of getTasksByStatus('In Progress')" class="p-4 bg-warning-50 rounded-lg border border-warning-200 hover:shadow-md transition cursor-pointer">
                <p class="font-medium text-slate-900">{{ task.title }}</p>
                <p class="text-xs text-slate-600 mt-1">{{ task.description }}</p>
                <div class="flex items-center gap-2 mt-3">
                  <span [ngClass]="getPriorityClass(task.priority)" class="px-2 py-1 rounded text-xs font-medium">
                    {{ task.priority }}
                  </span>
                  <span class="text-xs text-slate-500 ml-auto">{{ formatDate(task.dueDate) }}</span>
                </div>
                <div class="flex gap-2 mt-3">
                  <button (click)="updateTaskStatus(task, 'To Do')" class="flex-1 py-1 text-xs font-medium text-slate-600 hover:text-slate-700 border border-slate-200 rounded transition">
                    Back
                  </button>
                  <button (click)="updateTaskStatus(task, 'Done')" class="flex-1 py-1 text-xs font-medium text-success-600 hover:text-success-700 border border-success-200 rounded transition">
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Done Column -->
          <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div class="p-4 bg-slate-50 border-b border-slate-200">
              <h3 class="font-semibold text-slate-900 flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-success-400"></span>
                Done
                <span class="ml-auto text-xs font-bold text-slate-500">{{ getTasksByStatus('Done').length }}</span>
              </h3>
            </div>
            <div class="p-4 space-y-3 min-h-96">
              <div *ngFor="let task of getTasksByStatus('Done')" class="p-4 bg-success-50 rounded-lg border border-success-200 hover:shadow-md transition cursor-pointer opacity-75">
                <p class="font-medium text-slate-900 line-through">{{ task.title }}</p>
                <p class="text-xs text-slate-600 mt-1">{{ task.description }}</p>
                <div class="flex items-center gap-2 mt-3">
                  <span [ngClass]="getPriorityClass(task.priority)" class="px-2 py-1 rounded text-xs font-medium">
                    {{ task.priority }}
                  </span>
                  <span class="text-xs text-slate-500 ml-auto">{{ formatDate(task.dueDate) }}</span>
                </div>
                <button (click)="deleteTask(task)" class="w-full mt-3 py-1 text-xs font-medium text-danger-600 hover:text-danger-700 border border-danger-200 rounded transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `
})
export class ProjectDetailComponent implements OnInit {
  projectService = inject(ProjectService);
  taskService = inject(TaskService);
  private route = inject(ActivatedRoute);

  showCreateTask = false;

  taskForm = {
    title: '',
    description: '',
    priority: 'Medium' as any,
    dueDate: '',
    assignedTo: ''
  };

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe(() => {
        this.taskService.getTasksByProject(projectId).subscribe();
      });
    }
  }

  createTask() {
    if (!this.taskForm.title) return;

    const projectId = this.route.snapshot.paramMap.get('id')!;

    this.taskService.createTask(
      this.taskForm.title,
      this.taskForm.description,
      this.taskForm.dueDate,
      this.taskForm.priority,
      this.taskForm.assignedTo,
      projectId
    ).subscribe({
      next: () => {
        this.taskForm = { title: '', description: '', priority: 'Medium', dueDate: '', assignedTo: '' };
        this.showCreateTask = false;
      },
      error: (err) => {
        console.error('Failed to create task:', err);
      }
    });
  }

  getTasksByStatus(status: TaskStatus) {
    return this.taskService.tasks().filter(t => t.status === status);
  }

  updateTaskStatus(task: Task, newStatus: TaskStatus) {
    this.taskService.updateTask(task.id, undefined, undefined, undefined, undefined, newStatus).subscribe();
  }

  deleteTask(task: Task) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(task.id).subscribe();
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'High':
        return 'bg-danger-100 text-danger-700';
      case 'Medium':
        return 'bg-warning-100 text-warning-700';
      case 'Low':
        return 'bg-success-100 text-success-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  }
}
