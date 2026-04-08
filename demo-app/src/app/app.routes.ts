import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // Eagerly loaded
    canActivate: [MsalGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [MsalGuard],
  },
  {
    path: 'edit-record/:id',
    loadComponent: () =>
      import('./features/edit-record/edit-record.component').then((m) => m.EditRecordComponent),
    canActivate: [MsalGuard],
  },
  {
    path: 'service-unavailable',
    loadComponent: () =>
      import('./features/service-unavailable/service-unavailable.component').then(
        (m) => m.ServiceUnavailableComponent
      ),
    // No MsalGuard — must be accessible when auth fails
  },
];
