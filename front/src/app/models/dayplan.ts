import { Meal } from './meal'

export interface DayPlan {
  id?: Number
  date?: string
  appUserId: number
  meals?: Meal[]
}
