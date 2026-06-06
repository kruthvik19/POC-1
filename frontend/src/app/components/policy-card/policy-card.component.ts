import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Policy } from '../../models/policy.model';

@Component({
  selector: 'app-policy-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  template: `
    <p-card class="policy-card">
  <ng-template pTemplate="header">
    <div class="policy-header">
      <h3>{{ policy.name }}</h3>
    </div>
  </ng-template>

  <div class="policy-body">
    <div class="policy-item">
      <span class="label">Premium</span>
      <span class="value">₹{{ policy.premium }}/year</span>
    </div>

    <div class="policy-item">
      <span class="label">Coverage</span>
      <span class="value">₹{{ policy.coverage }}</span>
    </div>

    <div class="policy-item">
      <span class="label">Duration</span>
      <span class="value">{{ policy.duration }} years</span>
    </div>

    <div class="policy-item">
      <span class="label">Eligibility</span>
      <span class="value">{{ policy.eligibility }}</span>
    </div>

    <div class="benefits-section">
      <h4>Benefits</h4>
      <ul>
        <li *ngFor="let b of policy.benefits">
          {{ b }}
        </li>
      </ul>
    </div>
  </div>

  <div class="policy-actions" *ngIf="isAdmin">
  <button
    pButton
    type="button"
    label="Edit"
    class="action-btn"
    (click)="onEdit()">
  </button>

  <button
    pButton
    type="button"
    label="Delete"
    class="action-btn"
    (click)="onDelete()">
  </button>
</div>
</p-card>
  `,
  styles: [`
    .policy-card { width: 280px; }
    .policy-body { font-size: 14px; }
    .policy-actions { display: flex; gap: 8px; margin-top: 12px; }
  `]
})
export class PolicyCardComponent {
  @Input() policy!: Policy;
  @Input() isAdmin = false;
  @Output() editClick = new EventEmitter<Policy>();
  @Output() deleteClick = new EventEmitter<Policy>();

  onEdit() {
    this.editClick.emit(this.policy);
  }

  onDelete() {
    this.deleteClick.emit(this.policy);
  }
}
