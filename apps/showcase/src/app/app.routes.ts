import { Routes } from '@angular/router';
import { SHOWCASE_DEFAULT_COMPONENT_ID } from './showcase-catalog';

export const routes: Routes = [
  {
    path: '',
    redirectTo: `components/${SHOWCASE_DEFAULT_COMPONENT_ID}`,
    pathMatch: 'full',
  },
  {
    path: 'components/:id',
    loadComponent: () =>
      import('./component-detail-page.component').then((m) => m.ComponentDetailPageComponent),
  },
  {
    path: '**',
    redirectTo: `components/${SHOWCASE_DEFAULT_COMPONENT_ID}`,
  },
];
