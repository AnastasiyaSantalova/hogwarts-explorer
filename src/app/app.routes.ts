import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: {
      preload: true,
    },
    loadComponent: () => import('./home/pages/home/home').then((m) => m.Home),
  },
  {
    path: 'spells',
    data: {
      preload: true,
    },
    loadComponent: () =>
      import('./spells/pages/spells-list/spells-list').then(
        (m) => m.SpellsList
      ),
  },
  {
    path: 'houses',
    data: {
      preload: true,
    },
    loadComponent: () =>
      import('./houses/pages/houses-list/houses-list').then(
        (m) => m.HousesList
      ),
  },
  {
    path: 'ingredients',
    data: {
      preload: true,
    },
    loadComponent: () =>
      import('./ingredients/pages/ingredients-list/ingredients-list').then(
        (m) => m.IngredientsList
      ),
  },
  {
    path: 'elixirs',
    data: {
      preload: true,
    },
    loadComponent: () =>
      import('./elixirs/pages/elixirs-list/elixirs-list').then(
        (m) => m.ElixirsList
      ),
  },
];
