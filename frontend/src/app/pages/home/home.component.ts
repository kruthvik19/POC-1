import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { PolicyCardComponent } from '../../components/policy-card/policy-card.component';
import { Policy } from '../../models/policy.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CardModule, PolicyCardComponent,ButtonModule],
  template: `
    <div class="hero" *ngIf="!isAdmin">
      <h1>Welcome to Insure+ Insurance Portal</h1>
      <p>Explore Our Latest Policies</p>
    </div>

    <div class="hero" *ngIf="isAdmin">
      <h1>Our Policies</h1>
      <p></p>
    </div>

    <div class="cards">
      <app-policy-card 
        *ngFor="let p of policies" 
        [policy]="p" 
        [isAdmin]="isAdmin"
        (editClick)="onEditPolicy($event)"
        (deleteClick)="onDeletePolicy($event)">
      </app-policy-card>
        <div class="add-policy-container" *ngIf="isAdmin">
        <button pButton type="button" label="+ Add New Policy" (click)="onAddPolicyClick()" class="p-button-success full-width"></button>
      </div>
    </div>
  
  `,
 styles: [`
  .hero {
    text-align: center;
  }

  .hero h1 {
    margin: 0;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
  }

  .hero p {
    margin-top: 0.75rem;
    font-size: 1.1rem;
    opacity: 0.9;
    font-weight: 500;
    color: lightslategrey;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(320px, 1fr)
    );
    gap: 24px;
    padding: 0 2rem 3rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .cards {
      padding: 0 1rem 2rem;
      gap: 16px;
    }

    .hero {
      padding: 2rem 1rem;
    }

    .hero p {
      font-size: 1rem;
    }
  }
`]
})
export class HomePageComponent implements OnInit {
  @Input() policies: Policy[] = [];
  @Input() isAdmin = false;
  @Output() editPolicy = new EventEmitter<Policy>();
  @Output() deletePolicy = new EventEmitter<Policy>();
  @Output() addPolicyClick = new EventEmitter<void>();

  onAddPolicyClick() {
    this.addPolicyClick.emit();
  }
  ngOnInit() {}

  onEditPolicy(policy: Policy) {
    this.editPolicy.emit(policy);
  }

  onDeletePolicy(policy: Policy) {
    this.deletePolicy.emit(policy);
  }
}
