import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    PasswordModule
  ],
  template: `
    <p-dialog
  header="Admin Login"
  [(visible)]="visible"
  [modal]="true"
  [draggable]="false"
  [resizable]="false"
  [closable]="false"
  styleClass="login-dialog"
  [style]="{ width: '420px' }">

  <div class="login-form">

    <p-floatLabel variant="on">
      <input
        pInputText
        id="username"
        [(ngModel)]="model.username" />
      <label for="username">Username</label>
    </p-floatLabel>

    <p-floatLabel variant="on">
      <p-password
        id="password"
        [(ngModel)]="model.password"
        [feedback]="false"
        [toggleMask]="true"
        styleClass="password-field">
      </p-password>
      <label for="password">Password</label>
    </p-floatLabel>

    <button
      pButton
      type="button"
      label="Login"
      class="login-btn"
      (click)="onLogin()">
    </button>

    <button
      pButton
      type="button"
      label="Close"
      severity="secondary"
      text
      (click)="visibleChange.emit(false)">
    </button>

  </div>
</p-dialog>
  `,
  styles: [`
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding-top: 1rem;
    }

    p-floatLabel {
      display: block;
      width: 100%;
    }

    .w-full {
      width: 100%;
    }

    :host ::ng-deep .p-inputtext {
      width: 100%;
    }

    :host ::ng-deep .password-field,
    :host ::ng-deep .password-field .p-password-input,
    :host ::ng-deep .p-password {
      width: 100%;
    }

    :host ::ng-deep .p-dialog-header {
      font-size: 1.2rem;
      font-weight: 600;
      justify-content: center;
    border-top-left-radius: 21px;
    border-top-right-radius: 21px;
    }

    :host ::ng-deep .p-dialog-content {
      padding-top: 1rem;
      border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    }

    @media (max-width: 576px) {
      :host ::ng-deep .p-dialog {
        width: 95vw !important;

      }
    }
  `]
})
export class LoginDialogComponent {
  @Input() visible = false;

  @Output() visibleChange =
    new EventEmitter<boolean>();

  @Output() loginSubmitted =
    new EventEmitter<{
      username: string;
      password: string;
    }>();

  model = {
    username: '',
    password: ''
  };

  onVisibilityChange(
    value: boolean
  ): void {
    this.visibleChange.emit(value);
  }

  onLogin(): void {
    const username =
      this.model.username.trim();

    const password =
      this.model.password.trim();

    if (!username || !password) {
      return;
    }

    this.loginSubmitted.emit({
      username,
      password
    });

    this.model = {
      username: '',
      password: ''
    };
  }
}