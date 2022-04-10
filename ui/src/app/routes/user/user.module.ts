import { NgModule } from '@angular/core';

import { SharedModule, QuestionModule, ResultModule } from '@shared';

import { UserRouterModule } from './user-router.module';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    UserRouterModule,
    QuestionModule,
    ResultModule
  ],
  exports: [UserRouterModule],
  declarations: [UserComponent]
})

export class UserModule { }
