import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./routes/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./routes/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./routes/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./routes/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./routes/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'join',
    loadChildren: () => import('./routes/join/join.module').then(m => m.JoinModule)
  },
  {
    path: 'quiz',
    loadChildren: () => import('./routes/quiz/quiz.module').then(m => m.QuizModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./routes/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./routes/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'analytics',
    canActivate: [AuthGuard],
    loadChildren: () => import('./routes/analytics/analytics.module').then(m => m.AnalyticsModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
