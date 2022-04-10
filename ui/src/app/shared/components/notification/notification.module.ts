import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { NotificationComponent } from './notification.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    NotificationComponent
  ],
  declarations: [
    NotificationComponent
  ]
})

export class NotificationModule {}
