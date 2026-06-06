import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="admin-bar">
      <div class="sidebar">
        <h2>Admin Dashboard</h2>
        <button pButton type="button" label="Policies" class="p-button-secondary full-width" (click)="onPoliciesClick()"></button>
        <button pButton type="button" label="Logout" class="p-button-danger full-width" (click)="onLogoutClick()"></button>
      </div>
    </div>
  `,
  styles: [`
    .admin-bar { position: fixed; left: 0; top: 64px; bottom: 0; }
    .sidebar { width: 220px; background: #0f3460; color: #fff; height: 100%; padding: 20px; }
    .sidebar h2 { color: #fff; margin-top: 0; }
    .full-width { width: 100%; margin-bottom: 10px; }
  `]
})
export class AdminSidebarComponent {
  @Output() policiesClick = new EventEmitter<void>(); 
  @Output() logoutClick = new EventEmitter<void>();

  onPoliciesClick() {
    this.policiesClick.emit();
  }


  onLogoutClick() {
    this.logoutClick.emit();
  }
}
