import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ShoppingList } from 'src/app/models/shoppingList'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private shoppingListUrl = `${environment.apiUrl}/ShoppingList`

  constructor(private http: HttpClient) {}

  addIngredients(shoppingList: ShoppingList): Observable<any> {
    return this.http.post(this.shoppingListUrl, shoppingList)
  }

  updateIsChecked(
    shoppingListId: number,
    ingredientId: number,
    isChecked: boolean
  ): Observable<any> {
    return this.http.put(
      `${this.shoppingListUrl}/${shoppingListId}/${ingredientId}/${isChecked}`,
      {}
    )
  }

  removeIngredient(
    shoppingListId: number,
    ingredientId: number
  ): Observable<any> {
    return this.http.delete(
      `${this.shoppingListUrl}/${shoppingListId}/${ingredientId}`
    )
  }

  getShoppingList(dayDate: string): Observable<any> {
    return this.http.get(`${this.shoppingListUrl}/${dayDate}`)
  }
}
