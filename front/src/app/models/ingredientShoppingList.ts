import { Ingredient } from './ingredient'
import { Unit } from './unit'

export interface IngredientShoppingList {
  quantity?: number
  unit?: Unit
  ingredient: Ingredient
}
