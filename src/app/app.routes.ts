import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadComponent: () => import('./features/home/home').then((c) => c.Home) },
  { path: 'about', loadComponent: () => import('./features/about/about').then((c) => c.About) },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile').then((c) => c.Profile),
  },
  {
    path: 'registration',
    loadComponent: () => import('./features/registration/registration').then((c) => c.Registration),
  },
  { path: 'login', loadComponent: () => import('./features/login/login').then((c) => c.Login) },
  {
    path: 'category/:level/:category',
    loadComponent: () => import('./features/category/category').then((c) => c.Category),
  },
  {
    path: 'category/:level/:category/:pairs',
    loadComponent: () =>
      import('./features/category/features/match-pairs/match-pairs').then((c) => c.MatchPairs),
  },
  {
    path: 'category/:level/:category/true-false',
    loadComponent: () =>
      import('./features/category/features/true-false/true-false').then((c) => c.TrueFalse),
  },
  { path: '**', redirectTo: 'home' },
];
