import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { RouterModule } from '@angular/router';
import { SettingsRouterModule } from './settings-router.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    SettingsRouterModule
  ],
  exports: [SettingsRouterModule],
  declarations: [SettingsComponent]
})

export class SettingsModule { }
