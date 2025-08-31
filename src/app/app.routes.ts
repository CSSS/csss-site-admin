import { Routes } from '@angular/router';
import { routes as dashboardRoutes } from './pages/dashboard/dashboard.routes';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: dashboardRoutes,
    title: 'Dashboard'
  }
];
