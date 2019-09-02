import { Expense, TotalByDate } from "./types";

const date = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))

export const initialState = () => ({
    loadingExpenses: false,
    loadFailed: false,
    expenses: [] as Expense[],
    weeksExpenses: [] as TotalByDate[],
    monthsExpenses: [] as TotalByDate[],
    yearsExpenses: [] as TotalByDate[],
    weeksTotal: 0,
    monthsTotal: 0,
    yearsTotal: 0,
    defaultExpense: {
        id: "",
        title: "",
        price: 0.00,
        isSaving: false,
        icon: "Cafe",
        date: date.toLocaleDateString("en-GB", {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})
    } as Expense
})