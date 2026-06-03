import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';

export const appRoutes: Route[] = [
  { path: '', component: HomePageComponent },
  { path: 'todos', component: TodoPageComponent },
  { path: '**', redirectTo: '' }
];
