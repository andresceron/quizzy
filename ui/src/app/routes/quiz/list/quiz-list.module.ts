import { NgModule } from '@angular/core';

import { SharedModule, QuestionModule, ResultModule } from '@shared';

import { QuizListRouterModule } from './quiz-list-router.module';
import { RouterModule } from '@angular/router';
import { QuizListComponent } from './quiz-list.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    QuizListRouterModule,
    QuestionModule,
    ResultModule
  ],
  exports: [QuizListRouterModule],
  declarations: [QuizListComponent]
})

export class QuizListModule { }
