import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks';
  
  tasks = signal<Task[]>([]);

  constructor(private http: HttpClient) {}

  getTasksByProject(projectId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/project/${projectId}`).pipe(
      tap(tasks => this.tasks.set(tasks))
    );
  }

  createTask(
    title: string,
    description: string,
    dueDate: string,
    priority: TaskPriority,
    assignedTo: string,
    projectId: string
  ): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, {
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      projectId
    }).pipe(
      tap(task => {
        this.tasks.set([...this.tasks(), task]);
      })
    );
  }

  updateTask(
    id: string,
    title?: string,
    description?: string,
    dueDate?: string,
    priority?: TaskPriority,
    status?: TaskStatus,
    assignedTo?: string
  ): Observable<Task> {
    const payload: any = {};
    if (title) payload.title = title;
    if (description) payload.description = description;
    if (dueDate) payload.dueDate = dueDate;
    if (priority) payload.priority = priority;
    if (status) payload.status = status;
    if (assignedTo) payload.assignedTo = assignedTo;

    return this.http.put<Task>(`${this.apiUrl}/${id}`, payload).pipe(
      tap(task => {
        const updated = this.tasks().map(t => t.id === id ? task : t);
        this.tasks.set(updated);
      })
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.tasks.set(this.tasks().filter(t => t.id !== id));
      })
    );
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks().filter(t => t.status === status);
  }

  getTasksByPriority(priority: TaskPriority): Task[] {
    return this.tasks().filter(t => t.priority === priority);
  }
}
