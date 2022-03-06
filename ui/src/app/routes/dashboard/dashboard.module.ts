import { NgModule } from '@angular/core';

// import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';

import { RouterModule } from '@angular/router';
import { DashboardRouterModule } from './dashboard-router.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    DashboardRouterModule
  ],
  exports: [DashboardRouterModule],
  declarations: [DashboardComponent]
})

export class DashboardModule { }
