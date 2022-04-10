import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { TimerComponent } from '@components/timer/timer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    TimerComponent
  ],
  declarations: [
    TimerComponent
  ]
})

export class TimerModule {}
