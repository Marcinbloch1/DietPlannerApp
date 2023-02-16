import { Category } from './category'
import { Macro } from './macro'
import { MealIngredient } from './mealIngredients'
import { Photo } from './photo'

export interface Meal {
  id?: Number
  mealName: string
  description: string
  imagePath: string
  category: Category
  mealMacro?: Macro
  mealIngredients?: MealIngredient[]
  photo: Photo
}
