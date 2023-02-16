import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { Meal } from 'src/app/models/meal'
import { DayplanService } from 'src/app/services/dayplan/dayplan.service'
import { IonDatetime, IonItemSliding } from '@ionic/angular'
import { ToastService } from 'src/app/services/toast/toast.service'
import { ShoppingList } from 'src/app/models/shoppingList'
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import * as moment from 'moment'

@Component({
  selector: 'app-meal-cards',
  templateUrl: './meal-cards.component.html',
  styleUrls: ['./meal-cards.component.scss'],
})
export class MealCardsComponent implements OnInit {
  @Input() meal: Meal
  @Input() dayPlanId: Number
  @Input() selectedDate: string
  @Output() mealIdEvent = new EventEmitter<Number>()

  isDescription = false

  shoppingList?: ShoppingList = new ShoppingList()

  form: FormGroup
  @ViewChild('datePicker') datePicker: IonDatetime

  constructor(
    private dayPlanService: DayplanService,
    private router: Router,
    private toastService: ToastService,
    private shoppingListService: ShoppingListService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  removeMeal() {
    this.mealIdEvent.emit(this.meal.id)
    this.dayPlanService
      .removeMeal(this.dayPlanId, this.meal.id)
      .subscribe((res) => {})
  }

  addToList(slidingItem: IonItemSliding) {
    let dateObject = moment(this.selectedDate, 'YYYY-MM-DD').toDate()

    this.shoppingList.dayDate = dateObject.toDateString()

    this.shoppingList.ingredientShoppingLists = this.meal.mealIngredients

    this.shoppingListService
      .addIngredients(this.shoppingList)
      .subscribe((res) => {
        this.toastService.presentToast(
          `Added ${this.meal.mealName} to shopping list`,
          'success'
        )
        slidingItem.close()
      })
  }

  showDescription() {
    this.isDescription = !this.isDescription
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
}
