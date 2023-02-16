import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Tab2Page } from './tab2.page'

import { Tab2PageRoutingModule } from './tab2-routing.module'
import { ShoppingListItemComponent } from './shopping-list-item/shopping-list-item.component'

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, Tab2PageRoutingModule],
  declarations: [Tab2Page, ShoppingListItemComponent],
})
export class Tab2PageModule {}
