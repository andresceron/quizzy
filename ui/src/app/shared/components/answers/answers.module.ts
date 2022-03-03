import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { AnswersComponent } from '@components/answers/answers.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    AnswersComponent
  ],
  declarations: [
    AnswersComponent
  ]
})

export class AnswersModule {}
