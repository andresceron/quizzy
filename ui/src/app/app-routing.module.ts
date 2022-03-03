import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'quiz',
    loadChildren: () => import('./routes/quiz/quiz.module').then(m => m.QuizModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
