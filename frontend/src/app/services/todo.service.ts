import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

const API_URL = 'http://localhost:4000/api/todos';

@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Todo[]>(API_URL);
  }

  create(todo: Partial<Todo>) {
    return this.http.post<Todo>(API_URL, todo);
  }

  update(id: string, payload: Partial<Todo>) {
    return this.http.put<Todo>(`${API_URL}/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete<{ success: boolean }>(`${API_URL}/${id}`);
  }
}
