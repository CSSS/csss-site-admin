import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'officers',
    loadComponent: () =>
      import('./officers/officers-table/officers-table.component').then(
        m => m.OfficersTableComponent
      )
  },
  {
    path: 'elections',
    loadComponent: () =>
      import('./elections/elections-table/elections-table.component').then(
        m => m.ElectionsTableComponent
      )
  },
  {
    path: 'candidates',
    loadComponent: () =>
      import('./candidates/candidates-table/candidates-table.component').then(
        m => m.CandidatesComponent
      )
  },
  {
    path: 'nominees',
    loadComponent: () =>
      import('./nominees/nominees-table/nominees-table.component').then(m => m.NomineesComponent)
  }
];
