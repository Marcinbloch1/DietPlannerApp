import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Tab1Page } from './tab1.page'

import { Tab1PageRoutingModule } from './tab1-routing.module'
import { AddMealComponent } from './add-meal/add-meal.component'
import { MealCardsComponent } from './meal-cards/meal-cards.component'
import { NgSelectModule } from '@ng-select/ng-select'
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    NgSelectModule,
    NgOptionHighlightModule,
  ],
  declarations: [Tab1Page, AddMealComponent, MealCardsComponent],
})
export class Tab1PageModule {}
