import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { RouterModule } from '@angular/router';
import { ResetPasswordRouterModule } from './reset-password-router.module';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    ResetPasswordRouterModule
  ],
  exports: [ResetPasswordRouterModule],
  declarations: [ResetPasswordComponent]
})

export class ResetPasswordModule { }
