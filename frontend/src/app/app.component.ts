import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Todo {
  _id?: string;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.loading = true;
    this.error = '';
    this.http.get<Todo[]>('http://localhost:4000/api/todos').subscribe({
      next: data => {
        this.todos = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Could not load todos. Is the backend running?';
        this.loading = false;
      }
    });
  }
}
