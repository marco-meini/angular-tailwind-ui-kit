import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./routes').then((m) => m.ShowcaseOverviewPageComponent),
  },
  {
    path: 'foundation',
    loadComponent: () =>
      import('./routes').then((m) => m.ShowcaseFoundationPageComponent),
  },
  {
    path: 'navigation',
    loadComponent: () =>
      import('./routes').then((m) => m.ShowcaseNavigationPageComponent),
  },
  {
    path: 'interactive',
    loadComponent: () =>
      import('./routes').then((m) => m.ShowcaseInteractivePageComponent),
  },
  {
    path: 'advanced',
    loadComponent: () =>
      import('./routes').then((m) => m.ShowcaseAdvancedPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
