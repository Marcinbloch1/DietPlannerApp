import {
  trigger,
  transition,
  style,
  animate,
  animateChild,
  query,
  stagger,
} from '@angular/animations'
import { Component, Input, OnInit } from '@angular/core'
import * as moment from 'moment'
import { Ingredient } from 'src/app/models/ingredient'
import { MealIngredient } from 'src/app/models/mealIngredients'
import { ShoppingList } from 'src/app/models/shoppingList'
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  animations: [
    trigger('items', [
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate(
          '0.7s cubic-bezier(.8,-0.6,.83,.67)',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
            height: '0px',
            margin: '0px',
          })
        ),
      ]),
    ]),
  ],
})
export class Tab2Page implements OnInit {
  shoppingList: ShoppingList
  customPickerOptions: any
  selectedDate = new Date().toISOString()

  constructor(private shoppingLiistService: ShoppingListService) {}

  async ngOnInit() {
    await this.getShoppingList()
  }

  async ionViewWillEnter() {}

  async getShoppingList() {
    let dateObject = moment(this.selectedDate, 'YYYY-MM-DD').toDate()
    this.shoppingLiistService
      .getShoppingList(dateObject.toDateString())
      .subscribe((res) => {
        this.shoppingList = res
      })
  }

  moveIngredient(ingredient: MealIngredient) {
    if (ingredient.isChecked === true) {
      this.shoppingList.ingredientShoppingLists.push(
        this.shoppingList.ingredientShoppingLists.splice(
          this.shoppingList.ingredientShoppingLists.indexOf(ingredient),
          1
        )[0]
      )
    } else if (!ingredient.isChecked) {
      this.shoppingList.ingredientShoppingLists.unshift(
        this.shoppingList.ingredientShoppingLists.splice(
          this.shoppingList.ingredientShoppingLists.indexOf(ingredient),
          1
        )[0]
      )
    }
  }

  removeIngredient(ingredientId: number) {
    this.shoppingList.ingredientShoppingLists =
      this.shoppingList.ingredientShoppingLists.filter(
        (item) => item.ingredientId !== ingredientId
      )
  }

  previousDay() {
    let day = new Date(this.selectedDate)
    day.setDate(day.getDate() - 1)
    this.selectedDate = day.toISOString()
  }

  nextDay() {
    let day = new Date(this.selectedDate)
    day.setDate(day.getDate() + 1)
    this.selectedDate = day.toISOString()
  }

  doRefresh(event) {
    this.getShoppingList()
    event.target.complete()
  }
}
