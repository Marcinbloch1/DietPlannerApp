import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { UserSettingsModalPageRoutingModule } from './user-settings-modal-routing.module'

import { UserSettingsModalPage } from './user-settings-modal.page'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserSettingsModalPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [UserSettingsModalPage],
})
export class UserSettingsModalPageModule {}
