import { Ingredient } from './ingredient'
import { Unit } from './unit'

export interface MealIngredient {
  ingredientId?: number
  quantity?: number
  unit?: Unit
  isChecked: boolean
  ingredient: Ingredient
}
