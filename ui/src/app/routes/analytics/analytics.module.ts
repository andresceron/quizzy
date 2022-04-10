import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { RouterModule } from '@angular/router';
import { AnalyticsRouterModule } from './analytics-router.module';
import { AnalyticsComponent } from './analytics.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    AnalyticsRouterModule
  ],
  exports: [AnalyticsRouterModule],
  declarations: [AnalyticsComponent]
})

export class AnalyticsModule { }
