import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'elections',
    loadComponent: () =>
      import('./elections/elections-table/elections-table.component').then(
        m => m.ElectionsTableComponent
      )
  },
  {
    path: 'officers',
    loadComponent: () =>
      import('./officers/officers-table/officers-table.component').then(m => m.OfficersComponent)
  }
];
