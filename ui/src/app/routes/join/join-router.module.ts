import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinComponent } from './join.component';

const routes: Routes = [
  {
    path: '',
    component: JoinComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class JoinRouterModule {}
