import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, AuthResponse } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:4000/api';
  private token: string | null = null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  login(username: string, password: string): Promise<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/auth/login`, { username, password }).toPromise() as Promise<AuthResponse>;
  }

  register(username: string, password: string): Promise<any> {
    return this.http.post(`${this.base}/auth/register`, { username, password }).toPromise();
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }
}
