export interface Expense {
  id: string
  userID: string
  title: string
  price: number
  isSaving: boolean
  icon: string
  date: string
}

export interface TotalByDate {
  date: string
  total: number
}