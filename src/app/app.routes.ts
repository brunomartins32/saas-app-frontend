import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { ContasPagarReceberComponent } from './pages/contas-pagar-receber/contas-pagar-receber.component';
import { ContasPatrimoniaisComponent } from './pages/contas-patrimoniais/contas-patrimoniais.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),

        canActivate: [AuthGuard],
      },
      { path: 'contas-pagar-receber', component: ContasPagarReceberComponent },
      { path: 'contas-patrimoniais', component: ContasPatrimoniaisComponent },
      { path: '', redirectTo: 'contas-pagar-receber', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
