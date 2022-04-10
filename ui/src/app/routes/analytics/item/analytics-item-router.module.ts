import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyticsItemComponent } from './analytics-item.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsItemComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class AnalyticsItemRouterModule {}
