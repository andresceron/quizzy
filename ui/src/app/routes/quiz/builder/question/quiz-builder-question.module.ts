import { NgModule } from '@angular/core';
import { SharedModule, QuestionModule, ResultModule, ErrorMessageModule } from '@shared';
import { QuizBuilderQuestionRouterModule } from './quiz-builder-question-router.module';
import { RouterModule } from '@angular/router';
import { QuizBuilderQuestionComponent } from './quiz-builder-question.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    QuizBuilderQuestionRouterModule,
    QuestionModule,
    ResultModule,
    ErrorMessageModule
  ],
  exports: [QuizBuilderQuestionRouterModule],
  declarations: [QuizBuilderQuestionComponent]
})

export class QuizBuilderQuestionModule { }