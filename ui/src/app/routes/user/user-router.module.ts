import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: ':id',
    component: UserComponent,
  },
  {
    path: '',
    redirectTo: '/quiz/list'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class UserRouterModule {}
