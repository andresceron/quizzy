import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { RouterModule } from '@angular/router';
import { JoinRouterModule } from './join-router.module';
import { JoinComponent } from './join.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    JoinRouterModule
  ],
  exports: [JoinRouterModule],
  declarations: [JoinComponent]
})

export class JoinModule { }
