import { NgModule } from '@angular/core';

import { SharedModule, QuestionModule, ResultModule, TimerModule, ErrorMessageModule } from '@shared';

import { QuizBuilderRouterModule } from './quiz-builder-router.module';
import { RouterModule } from '@angular/router';
import { QuizBuilderComponent } from './quiz-builder.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    QuizBuilderRouterModule,
    QuestionModule,
    ResultModule,
    TimerModule,
    ErrorMessageModule
  ],
  exports: [QuizBuilderRouterModule],
  declarations: [QuizBuilderComponent]
})

export class QuizBuilderModule { }
