import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-policy-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule
  ],
  template: `
    <p-dialog
      [header]="header"
      [(visible)]="visible"
      (visibleChange)="onVisibilityChange($event)"
      [modal]="true"
      [style]="{ width: '500px' }">

      <div *ngIf="model" class="form-container">

        <div class="field">
          <label>Policy Name</label>
          <input
            pInputText
            [(ngModel)]="model.name" />
        </div>

        <div class="field">
          <label>Premium (₹ per year)</label>
          <input
            pInputText
            type="number"
            [(ngModel)]="model.premium"
            (ngModelChange)="onPremiumChange($event)" />
        </div>

        <div class="field">
          <label>Coverage Amount (₹)</label>
          <input
            pInputText
            [ngModel]="model.coverage"
            readonly
            class="readonly-field" />
        </div>

        <div class="field">
          <label>Duration (years)</label>
          <input
            pInputText
            type="number"
            [(ngModel)]="model.duration" />
        </div>

        <div class="field">
          <label>Eligibility</label>
          <input
            pInputText
            [(ngModel)]="model.eligibility" />
        </div>

        <div class="field">
          <label>Benefits (comma separated)</label>
          <input
            pInputText
            [(ngModel)]="model.benefitsText" />
        </div>

        <div class="action-bar">
          <button
            pButton
            type="button"
            [label]="submitLabel"
            (click)="onSubmit()">
          </button>
        </div>

      </div>
    </p-dialog>
  `,
  styles: [`
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .field {
      display: flex;
      flex-direction: column;
    }

    label {
      margin-bottom: 6px;
      font-weight: 600;
      color: #334155;
    }

    input {
      width: 100%;
    }

    .readonly-field {
      background: #f8fafc;
      cursor: not-allowed;
    }

    .helper-text {
      margin-top: 4px;
      color: #64748b;
      font-size: 12px;
    }

    .action-bar {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
    }
  `]
})
export class PolicyFormDialogComponent implements OnChanges {
  @Input() visible = false;

  @Input() isEdit = false;

  @Input() model: any = null;

  @Output() visibleChange =
    new EventEmitter<boolean>();

  @Output() submitted =
    new EventEmitter<any>();

  get header(): string {
    return this.isEdit
      ? 'Edit Policy'
      : 'Add Policy';
  }

  get submitLabel(): string {
    return this.isEdit
      ? 'Update'
      : 'Save';
  }

  ngOnChanges(
    changes: SimpleChanges
  ): void {
    if (this.model?.premium) {
      this.model.coverage =
        Number(this.model.premium) * 130;
    }
  }

  onPremiumChange(
    value: number | string
  ): void {
    const premium =
      Number(value) || 0;

    this.model.premium = premium;
    this.model.coverage =
      premium * 130;
  }

  onVisibilityChange(
    value: boolean
  ): void {
    this.visibleChange.emit(value);
  }

  onSubmit(): void {
    if (!this.model) return;

    const submitModel = {
      ...this.model,
      benefits: (this.model.benefitsText || '')
        .split(',')
        .map((s: string) => s.trim())
        .filter((s: string) => s)
    };

    this.submitted.emit(
      submitModel
    );
  }
}