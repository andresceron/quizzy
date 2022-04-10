import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizComponent } from './quiz.component';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./list/quiz-list.module').then(m => m.QuizListModule)
  },
  {
    path: 'builder',
    loadChildren: () => import('./builder/quiz-builder.module').then(m => m.QuizBuilderModule)
  },
  {
    path: ':id',
    component: QuizComponent,
  },
  {
    path: '',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class QuizRouterModule {}
