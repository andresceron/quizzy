import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizBuilderComponent } from './quiz-builder.component';

const routes: Routes = [
  {
    path: ':quizId/q/:questionId',
    loadChildren: () => import('./question/quiz-builder-question.module').then(m => m.QuizBuilderQuestionModule)
  },
  {
    path: ':quizId',
    component: QuizBuilderComponent,
  },
  {
    path: 'new',
    component: QuizBuilderComponent,
  },
  {
    path: '',
    redirectTo: 'new'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class QuizBuilderRouterModule {}
