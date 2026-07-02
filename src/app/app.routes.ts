import { Routes } from '@angular/router';
import { authGuard } from '@pages/auth/guards/auth.guard';
import { routes as dashboardRoutes } from './pages/dashboard/dashboard.routes';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: dashboardRoutes,
    title: 'Dashboard',
    // TODO: Enable me before hosting
    canActivate: [authGuard],
    canActivateChild: [authGuard]
  },
  {
    path: '',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent),
    title: 'Login'
  }
];
