import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'elections',
    loadComponent: () =>
      import('./elections-table/elections-table.component').then(m => m.ElectionsTableComponent)
  }
];
