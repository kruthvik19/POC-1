import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoListComponent],
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {
  todos: Todo[] = [];
  newTitle = '';
  editingId: string | null = null;
  editingTitle = '';
  error = '';
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  private toastTimer: any;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.error = '';
    this.todoService.getAll().subscribe({
      next: todos => (this.todos = todos),
      error: () => {
        this.error = 'Unable to load tasks. Is the backend running?';
      }
    });
  }

  showToast(message: string, type: 'success' | 'error' = 'success'): void {
    this.toastMessage = message;
    this.toastType = type;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }

  addTodo(): void {
    const title = this.newTitle.trim();
    if (!title) {
      this.showToast('You must provide a task title.', 'error');
      return;
    }

    this.todoService.create({ title, completed: false }).subscribe({
      next: todo => {
        this.todos = [todo, ...this.todos];
        this.newTitle = '';
        this.showToast('Task created successfully.', 'success');
      },
      error: () => {
        this.showToast('Could not create task.', 'error');
      }
    });
  }

  startEdit(todo: Todo): void {
    this.editingId = todo._id || null;
    this.editingTitle = todo.title;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editingTitle = '';
  }

  saveTodo(todo: Todo): void {
    if (!todo._id) {
      return;
    }

    const title = this.editingTitle.trim();
    if (!title) {
      this.showToast('Task title cannot be empty.', 'error');
      return;
    }

    this.todoService.update(todo._id, { title }).subscribe({
      next: updated => {
        this.todos = this.todos.map(t => (t._id === updated._id ? updated : t));
        this.cancelEdit();
        this.showToast('Task updated successfully.', 'success');
      },
      error: () => {
        this.showToast('Could not update task.', 'error');
      }
    });
  }

  toggleCompleted(todo: Todo): void {
    if (!todo._id) {
      return;
    }

    this.todoService.update(todo._id, { completed: !todo.completed }).subscribe({
      next: updated => {
        this.todos = this.todos.map(t => (t._id === updated._id ? updated : t));
        this.showToast('Task status updated.', 'success');
      },
      error: () => {
        this.showToast('Could not update task status.', 'error');
      }
    });
  }

  deleteTodo(todo: Todo): void {
    if (!todo._id) {
      return;
    }

    this.todoService.delete(todo._id).subscribe({
      next: () => {
        this.todos = this.todos.filter(t => t._id !== todo._id);
        this.showToast('Task deleted successfully.', 'success');
      },
      error: () => {
        this.showToast('Could not delete task.', 'error');
      }
    });
  }
}
