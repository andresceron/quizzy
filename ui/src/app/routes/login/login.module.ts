import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@modules/shared.module';
import { LoginRouterModule } from './login-router.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    LoginRouterModule
  ],
  exports: [LoginRouterModule],
  declarations: [LoginComponent]
})

export class LoginModule { }
