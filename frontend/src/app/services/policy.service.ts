import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Policy } from '../models/policy.model';

@Injectable({ providedIn: 'root' })
export class PolicyService {
  private base = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  getPolicies(): Promise<Policy[]> {
    return this.http.get<Policy[]>(`${this.base}/policies`).toPromise() as Promise<Policy[]>;
  }

  createPolicy(policy: Policy, token: string): Promise<Policy> {
    return this.http.post<Policy>(`${this.base}/policies`, policy, { headers: this.authHeader(token) }).toPromise() as Promise<Policy>;
  }

  updatePolicy(id: string, policy: Policy, token: string): Promise<Policy> {
    return this.http.put<Policy>(`${this.base}/policies/${id}`, policy, { headers: this.authHeader(token) }).toPromise() as Promise<Policy>;
  }

  deletePolicy(id: string, token: string): Promise<Policy> {
    return this.http.delete<Policy>(`${this.base}/policies/${id}`, { headers: this.authHeader(token) }).toPromise() as Promise<Policy>;
  }

  private authHeader(token: string) {
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}
