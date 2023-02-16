import { DatePipe } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { IonDatetime, ModalController } from '@ionic/angular'
import { DayPlan } from 'src/app/models/dayplan'
import { DayplanService } from 'src/app/services/dayplan/dayplan.service'
import { LoginService } from 'src/app/services/login/login.service'
import { User } from '../../models/user'
import { UsersService } from '../../services/users/users.service'
import { Moment } from 'moment'
import * as moment from 'moment'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  animateChild,
  // ...
} from '@angular/animations'
import { take, timeout } from 'rxjs/operators'
import { AddMealComponent } from './add-meal/add-meal.component'
import { MacroService } from 'src/app/services/macro/macro.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }), // initial
        animate(
          '0.8s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 })
        ), // final
      ]),
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
    // trigger('list', [
    //   transition(':enter', [query('@items', stagger(300, animateChild()))]),
    // ]),
    //.17,.67,.83,.67
    //.8, -0.6, 0.2, 1.5
    // trigger('list', [
    //   transition(':enter', [query('@items', stagger(300, animateChild()))]),
    // ]),
  ],
})
export class Tab1Page implements OnInit, OnDestroy {
  users: User[] = []
  tokenString: string
  randomUser: User
  user: User
  customPickerOptions: any
  selectedDate = new Date().toISOString()
  dayPlan: DayPlan
  form: FormGroup
  kcalSum: number = 0
  proteinsSum: number = 0
  fatSum: number = 0
  carbsSum: number = 0

  @ViewChild('datePicker') datePicker: IonDatetime

  constructor(
    private userService: UsersService,
    private dayPlanService: DayplanService,
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    public macroService: MacroService,
    private loginService: LoginService
  ) {}

  async ngOnInit() {
    this.loginService.currentUser$.pipe(take(1)).subscribe((res) => {
      this.user = res
    })

    await this.getDayPlan()
  }

  async getDayPlan() {
    let dateObject = moment(this.selectedDate, 'YYYY-MM-DD').toDate()
    this.dayPlanService
      .getDayPlan(this.user.id, dateObject.toDateString())
      .subscribe((res) => {
        this.dayPlan = res
        this.sumMacros()
      })
  }

  createDayPlan() {
    let dateObject = moment(this.selectedDate, 'YYYY-MM-DD').toDate()

    this.form = this.formBuilder.group({
      dayDate: new FormControl(dateObject.toDateString()),
      appUserId: new FormControl(this.user.id),
    })

    this.dayPlanService
      .createDayPlan(this.form.getRawValue())
      .subscribe((res) => {
        this.getDayPlan()
      })
  }

  expandItem() {}
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

  async addMeal() {
    const modal = await this.modalController.create({
      component: AddMealComponent,
      cssClass: 'small-modal',
      backdropDismiss: true,
      componentProps: {
        dayPlan: this.dayPlan,
      },
    })

    modal.onDidDismiss().then((data) => {
      this.getDayPlan()
    })

    return await modal.present()
  }

  removeMeal(mealId: Number) {
    this.dayPlan.meals = this.dayPlan.meals.filter((item) => item.id !== mealId)
    this.sumMacros()
  }

  sumMacros() {
    this.kcalSum = 0
    this.proteinsSum = 0
    this.fatSum = 0
    this.carbsSum = 0
    if (this.dayPlan !== null) {
      this.dayPlan.meals.forEach((meal) => {
        this.kcalSum += meal.mealMacro.kcal
        this.proteinsSum += meal.mealMacro.proteins
        this.fatSum += meal.mealMacro.fat
        this.carbsSum += meal.mealMacro.carbs
      })
    }
  }

  @HostListener('unloaded')
  ngOnDestroy() {}

  ionViewWillEnter() {}

  ionViewWillLeave() {}
}
