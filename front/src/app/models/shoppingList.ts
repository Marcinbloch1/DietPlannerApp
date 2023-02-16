import { IngredientShoppingList } from './ingredientShoppingList'
import { MealIngredient } from './mealIngredients'

export class ShoppingList {
  id?: number
  dayDate?: string
  //   appUserId?: number
  ingredientShoppingLists?: MealIngredient[]
}
