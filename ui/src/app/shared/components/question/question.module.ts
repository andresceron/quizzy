import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { QuestionComponent } from '@components/question/question.component';
import { AnswersModule } from '@components/answers/answers.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    AnswersModule,
  ],
  exports: [
    QuestionComponent
  ],
  declarations: [
    QuestionComponent
  ]
})

export class QuestionModule {}
