import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./home/pages/home/home').then((m) => m.Home),
  },
  {
    path: 'spells',
    loadComponent: () =>
      import('./spells/pages/spells-list/spells-list').then(
        (m) => m.SpellsList
      ),
  },
];
