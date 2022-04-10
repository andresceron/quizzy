import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { ErrorMessageComponent } from '@components/error-message/error-message.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    ErrorMessageComponent
  ],
  declarations: [
    ErrorMessageComponent
  ]
})

export class ErrorMessageModule {}
