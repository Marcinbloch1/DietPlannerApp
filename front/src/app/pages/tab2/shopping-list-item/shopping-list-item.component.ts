import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { IonItemSliding } from '@ionic/angular'
import { Meal } from 'src/app/models/meal'
import { MealIngredient } from 'src/app/models/mealIngredients'
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service'

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.scss'],
})
export class ShoppingListItemComponent implements OnInit {
  @Input() ingredient: MealIngredient
  @Input() shoppingListId: number
  @Output() ingredientChange = new EventEmitter<MealIngredient>()
  @Output() ingredientRemove = new EventEmitter<number>()

  isChecked: boolean = false

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredientChange.emit(this.ingredient)
  }

  removeFromList(slidingItem: IonItemSliding) {
    slidingItem.close()
    this.ingredientRemove.emit(this.ingredient.ingredientId)
    this.shoppingListService
      .removeIngredient(this.shoppingListId, this.ingredient.ingredientId)
      .subscribe((res) => {})
  }

  clickedCheckbox(event) {
    if (event.detail.checked) {
      this.shoppingListService
        .updateIsChecked(
          this.shoppingListId,
          this.ingredient.ingredientId,
          true
        )
        .subscribe((res) => {})
    } else if (!event.detail.checked) {
      this.shoppingListService
        .updateIsChecked(
          this.shoppingListId,
          this.ingredient.ingredientId,
          false
        )
        .subscribe((res) => {})
    }
    this.ingredientChange.emit(this.ingredient)
  }
}
