import { Unit } from './unit'

export class IngredientsDto {
  ingredientName: string
  quantity: number
  unit: Unit
}

export class MealDto {
  public constructor(init?: Partial<MealDto>) {
    Object.assign(this, init)
  }

  mealName: string
  description: string
  imagePath: string
  categoryName: string
  kcal: number
  proteins: number
  fat: number
  carbs: number
  ingredients: IngredientsDto[]
  file: []
}
