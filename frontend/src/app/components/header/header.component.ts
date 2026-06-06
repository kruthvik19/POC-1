    import { Component, Input, Output, EventEmitter } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { ButtonModule } from 'primeng/button';

    @Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    template: `
        <div class="site-header">
        <div class="brand">INSURE+ Portal</div>
        <div class="login-link">
            <button *ngIf="!isAdmin" pButton type="button" label="Admin Login" class="p-button-text admin-login" (click)="onLoginClick()"></button>
        </div>
        </div>
    `,
    styles: [`
        .site-header {
        background: #1776d2;
        color: #fff;
        padding: 19px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        }
        .brand { font-weight: 700; font-size: 20px; }
    `]
    })
    export class HeaderComponent {
    @Input() isAdmin = false;
    @Output() loginRequested = new EventEmitter<void>();

    onLoginClick() {
        this.loginRequested.emit();
    }
    }
