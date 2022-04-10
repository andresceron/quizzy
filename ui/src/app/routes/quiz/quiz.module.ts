import { NgModule } from '@angular/core';
import { SharedModule, QuestionModule, ResultModule, TimerModule } from '@shared';
import { QuizRouterModule } from './quiz-router.module';
import { RouterModule } from '@angular/router';
import { QuizComponent } from './quiz.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    QuizRouterModule,
    QuestionModule,
    ResultModule,
    TimerModule
  ],
  exports: [QuizRouterModule],
  declarations: [QuizComponent]
})

export class QuizModule { }
