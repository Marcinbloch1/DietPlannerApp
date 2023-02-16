import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Observable } from 'rxjs'
import { DayPlan } from 'src/app/models/dayplan'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class DayplanService {
  private dayPlanUrl = environment.apiUrl + '/DayPlans'

  constructor(private http: HttpClient) {}

  getDayPlan(appUserId: Number, dayDate: string): Observable<any> {
    return this.http.get(`${this.dayPlanUrl}/${appUserId}/${dayDate}`)
  }

  createDayPlan(dayPlan: FormGroup): Observable<any> {
    return this.http.post(this.dayPlanUrl, dayPlan)
  }

  removeMeal(dayPlanId: Number, mealId: Number): Observable<any> {
    return this.http.delete(
      `${this.dayPlanUrl}?mealId=${mealId}&dayPlanId=${dayPlanId}`
    )
  }

  addMeal(dayPlanId: Number, mealId: number): Observable<any> {
    return this.http.put(
      `${this.dayPlanUrl}?mealId=${mealId}&dayPlanId=${dayPlanId}`,
      {}
    )
  }
}
