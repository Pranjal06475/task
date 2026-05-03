import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  
  isAuthenticated = signal(false);
  currentUser = signal<User | null>(null);
  token = signal<string | null>(null);

  constructor(private http: HttpClient) {
    this.checkAuth();
  }

  private checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      this.token.set(token);
      this.currentUser.set(JSON.parse(user));
      this.isAuthenticated.set(true);
    }
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
      name,
      email,
      password
    }).pipe(
      tap(response => this.setAuth(response))
    );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, {
      email,
      password
    }).pipe(
      tap(response => this.setAuth(response))
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token.set(null);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  private setAuth(response: AuthResponse) {
    const { token, user } = response;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token.set(token);
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
  }

  getToken(): string | null {
    return this.token();
  }
}
