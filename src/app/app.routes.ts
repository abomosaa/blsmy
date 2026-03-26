import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./pages/services/services').then((m) => m.Services),
      },
      {
        path: 'offers',
        loadComponent: () =>
          import('./pages/offers/offers').then((m) => m.Offers),
      },
      {
        path: 'hospitals',
        loadComponent: () =>
          import('./pages/hospitals/hospitals').then((m) => m.Hospitals),
      },
      {
        path: 'prices',
        loadComponent: () =>
          import('./pages/prices/prices').then((m) => m.Prices),
      },
      {
        path: 'jobs',
        loadComponent: () =>
          import('./pages/jobs/jobs').then((m) => m.Jobs),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact').then((m) => m.Contact),
      },
      {
        path: 'book',
        loadComponent: () =>
          import('./pages/book/book').then((m) => m.Book),
      },
      {
        path: 'medical-login',
        loadComponent: () =>
          import('./pages/medical-login/medical-login').then((m) => m.MedicalLogin),
      },
      {
        path: 'auth/login',
        redirectTo: 'contact',
        pathMatch: 'full',
      },
      {
        path: 'auth/signup',
        redirectTo: 'contact',
        pathMatch: 'full',
      },
      {
        path: 'login',
        redirectTo: 'contact',
        pathMatch: 'full',
      },
      {
        path: 'register',
        redirectTo: 'contact',
        pathMatch: 'full',
      },
      {
        path: 'medical-centers',
        redirectTo: 'hospitals',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'contact',
      },
    ],
  },
  { path: '**', redirectTo: 'contact' },
];
