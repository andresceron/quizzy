import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  declarations: []
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() private parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule already loaded');
    }
  }
}
