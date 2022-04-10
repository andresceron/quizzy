import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizListComponent } from './quiz-list.component';

const routes: Routes = [
  {
    path: '',
    component: QuizListComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class QuizListRouterModule {}
