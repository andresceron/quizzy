import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { ResultComponent } from '@components/result/result.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    ResultComponent
  ],
  declarations: [
    ResultComponent
  ]
})

export class ResultModule {}
