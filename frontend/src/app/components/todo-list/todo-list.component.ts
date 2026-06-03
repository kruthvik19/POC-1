import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Input() editingId: string | null = null;
  @Input() editingTitle = '';

  @Output() editingTitleChange = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Todo>();
  @Output() save = new EventEmitter<Todo>();
  @Output() cancel = new EventEmitter<void>();
  @Output() toggle = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<Todo>();
}
