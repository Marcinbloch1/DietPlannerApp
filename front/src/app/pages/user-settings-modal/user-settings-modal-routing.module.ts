import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSettingsModalPage } from './user-settings-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UserSettingsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSettingsModalPageRoutingModule {}
