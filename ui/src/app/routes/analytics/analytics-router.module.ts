import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyticsComponent } from './analytics.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsComponent,
  },
  {
    path: ':id',
    loadChildren: () => import('./item/analytics-item.module').then(m => m.AnalyticsItemModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class AnalyticsRouterModule {}
