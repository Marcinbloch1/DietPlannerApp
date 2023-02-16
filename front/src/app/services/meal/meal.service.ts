import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs'
import { Meal } from 'src/app/models/meal'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private mealUrl = environment.apiUrl + '/Meal'

  constructor(private http: HttpClient) {}

  getMeals(categoryId: number): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.mealUrl}/${categoryId}`)
  }

  addMeal(form: FormData): Observable<any> {
    return this.http.post(this.mealUrl, form)
  }
}
