import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ModalController } from '@ionic/angular'
import { Observable } from 'rxjs'
import { Category } from 'src/app/models/category'
import { DayPlan } from 'src/app/models/dayplan'
import { Meal } from 'src/app/models/meal'
import { CategoryService } from 'src/app/services/category/category.service'
import { DayplanService } from 'src/app/services/dayplan/dayplan.service'
import { MealService } from 'src/app/services/meal/meal.service'

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss'],
})
export class AddMealComponent implements OnInit {
  @Input() dayPlan: DayPlan

  categories: Category[] = []
  meals: Meal[] = []

  categoryId: number
  mealId: number

  meals$: Observable<Meal[]>
  categories$: Observable<Category[]>

  constructor(
    public modalController: ModalController,
    private categoryService: CategoryService,
    private mealService: MealService,
    private dayPlanService: DayplanService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories()
  }

  getMeals(event) {
    if (event) {
      this.meals$ = this.mealService.getMeals(this.categoryId)
    }
  }

  async addMeal() {
    await this.dayPlanService.addMeal(this.dayPlan.id, this.mealId).subscribe(
      (res) => {
        this.dismiss()
        this.router.navigateByUrl('tabs')
      },
      (err) => {}
    )
  }

  dismiss() {
    this.modalController.dismiss(this.dayPlan)
  }
}
