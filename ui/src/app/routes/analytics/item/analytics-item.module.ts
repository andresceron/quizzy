import { NgModule } from '@angular/core';

import { SharedModule, QuestionModule, ResultModule } from '@shared';

import { AnalyticsItemRouterModule } from './analytics-item-router.module';
import { RouterModule } from '@angular/router';
import { AnalyticsItemComponent } from './analytics-item.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    AnalyticsItemRouterModule,
    QuestionModule,
    ResultModule
  ],
  exports: [AnalyticsItemRouterModule],
  declarations: [AnalyticsItemComponent]
})

export class AnalyticsItemModule { }
