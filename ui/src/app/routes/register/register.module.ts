import { NgModule } from '@angular/core';

// import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';

import { RouterModule } from '@angular/router';
import { RegisterRouterModule } from './register-router.module';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    RegisterRouterModule
  ],
  exports: [RegisterRouterModule],
  declarations: [RegisterComponent]
})

export class RegisterModule { }
