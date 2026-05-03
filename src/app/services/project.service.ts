import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Project {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  members: Array<{ userId: string; role: 'Admin' | 'Member' }>;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:5000/api/projects';
  
  projects = signal<Project[]>([]);
  currentProject = signal<Project | null>(null);

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl).pipe(
      tap(projects => this.projects.set(projects))
    );
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`).pipe(
      tap(project => this.currentProject.set(project))
    );
  }

  createProject(name: string, description: string): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, {
      name,
      description
    }).pipe(
      tap(project => {
        this.projects.set([...this.projects(), project]);
      })
    );
  }

  updateProject(id: string, name: string, description: string): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, {
      name,
      description
    }).pipe(
      tap(project => {
        const updated = this.projects().map(p => p.id === id ? project : p);
        this.projects.set(updated);
        if (this.currentProject()?.id === id) {
          this.currentProject.set(project);
        }
      })
    );
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.projects.set(this.projects().filter(p => p.id !== id));
      })
    );
  }

  addMember(projectId: string, userId: string, role: string): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${projectId}/add-member`, {
      userId,
      role
    }).pipe(
      tap(project => {
        const updated = this.projects().map(p => p.id === projectId ? project : p);
        this.projects.set(updated);
        if (this.currentProject()?.id === projectId) {
          this.currentProject.set(project);
        }
      })
    );
  }

  removeMember(projectId: string, userId: string): Observable<Project> {
    return this.http.delete<Project>(`${this.apiUrl}/${projectId}/members/${userId}`).pipe(
      tap(project => {
        const updated = this.projects().map(p => p.id === projectId ? project : p);
        this.projects.set(updated);
        if (this.currentProject()?.id === projectId) {
          this.currentProject.set(project);
        }
      })
    );
  }
}
