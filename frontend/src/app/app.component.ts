import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PolicyService } from './services/policy.service';
import { AuthService } from './services/auth.service';
import { Policy } from './models/policy.model';

import { HeaderComponent } from './components/header/header.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { PolicyFormDialogComponent } from './components/policy-form-dialog/policy-form-dialog.component';
import { HomePageComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    LoginDialogComponent,
    AdminSidebarComponent,
    PolicyFormDialogComponent,
    HomePageComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private policyService = inject(PolicyService);
  private authService = inject(AuthService);

  policies: Policy[] = [];
  loading = false;
  isAdmin = false;
  token = '';

  showLoginDialog = false;
  showEditDialog = false;
  showAddDialog = false;
  editModel: any = null;
  addModel: any = { name: '', premium: '', coverage: '', duration: '', eligibility: '', benefits: '' };

  ngOnInit(): void {
    this.loadPolicies();
    const t = this.authService.getToken();
    if (t) {
      this.token = t;
      this.isAdmin = true;
    }
  }

  async loadPolicies() {
    this.loading = true;
    try {
      this.policies = await this.policyService.getPolicies();
    } catch (e) {
      console.error(e);
    }
    this.loading = false;
  }

  onLoginClick() {
    this.showLoginDialog = true;
  }

  async onLoginSubmit(credentials: { username: string; password: string }) {
    try {
      const res = await this.authService.login(credentials.username, credentials.password);
      this.authService.setToken(res.token);
      this.token = res.token;
      this.isAdmin = true;
      this.showLoginDialog = false;
    } catch (e) {
      alert('Login failed');
    }
  }

  onLogout() {
    this.authService.logout();
    this.token = '';
    this.isAdmin = false;
  }

  onEditPolicy(policy: Policy) {
    this.editModel = { ...policy, benefitsText: (policy.benefits || []).join(', ') };
    this.showEditDialog = true;
  }

  async onEditSubmit(model: any) {
    try {
      await this.policyService.updatePolicy(model.id || model._id, model, this.token);
      this.showEditDialog = false;
      this.loadPolicies();
    } catch (e) {
      alert('Update failed');
    }
  }

  async onDeletePolicy(policy: Policy) {
    if (!confirm('Delete policy?')) return;
    try {
      await this.policyService.deletePolicy(policy.id || policy._id || '', this.token);
      this.loadPolicies();
    } catch (e) {
      alert('Delete failed');
    }
  }

  onAddPolicyClick() {
    this.addModel = { name: '', premium: '', coverage: '', duration: '', eligibility: '', benefits: '' };
    this.showAddDialog = true;
  }

  async onAddSubmit(model: any) {
    try {
      await this.policyService.createPolicy(model, this.token);
      this.showAddDialog = false;
      this.addModel = { name: '', premium: '', coverage: '', duration: '', eligibility: '', benefits: '' };
      this.loadPolicies();
    } catch (e) {
      alert('Add failed');
    }
  }
}
