import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private ingredientUrl = environment.apiUrl + '/Ingredient'

  constructor(private http: HttpClient) {}

  getIngredients(): Observable<any> {
    return this.http.get(this.ingredientUrl)
  }
}
