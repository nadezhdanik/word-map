import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home',
    loadComponent:()=> import('./features/home/home').then(c=> c.Home)
  },
  {path: 'about',
    loadComponent:()=> import('./features/about/about').then(c=> c.About)
  },
  {path: 'profile',
    loadComponent:()=> import('./features/profile/profile').then(c=> c.Profile)
  },
  {path: 'registration',
    loadComponent:()=> import('./features/registration/registration').then(c=> c.Registration)
  },
  {path: 'login',
    loadComponent:()=> import('./features/login/login').then(c=> c.Login)
  },
  {path: '**', redirectTo: 'home'}
];
