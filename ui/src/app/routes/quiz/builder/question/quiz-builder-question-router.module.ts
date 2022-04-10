import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizBuilderQuestionComponent } from './quiz-builder-question.component';

const routes: Routes = [
  {
    path: '',
    component: QuizBuilderQuestionComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class QuizBuilderQuestionRouterModule {}
