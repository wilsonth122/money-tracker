import { Expense, TotalByDate } from './types'
import { appState } from '../appState';
import { calculateTotalByDate, getWeeksExpenses, getMonthsExpenses, getYearsExpenses, getTotal } from '../../utils/expenseStats';
import { loadExpenses } from './api';

export const actions = (update: any) => ({
  loadExpenses: () => update((state: any) => {
    loadExpenses(
      appState.actions(update).updateExpenseList, 
      appState.actions(update).loadFailed
    );

    return {
      ...state,
      loadingExpenses: true,
      loadFailed: false
    }
  }),
  
  updateExpenseList: (newExpenses: Expense[]) => update((state: any) => {
    let expenses: Expense[] = [];
    let totalByDate: TotalByDate[] = [];
    let weeksExpenses: TotalByDate[] = [];
    let monthsExpenses: TotalByDate[] = [];
    let yearsExpenses: TotalByDate[] = [];
    
    if (newExpenses) {
      expenses = [...newExpenses];

      expenses.sort((t1: Expense, t2: Expense) => {
        const a = new Date(t1.date);
        const b = new Date(t2.date);

        return +b - +a;
    });

      totalByDate = calculateTotalByDate(expenses);
      weeksExpenses = getWeeksExpenses(totalByDate);
      monthsExpenses = getMonthsExpenses(totalByDate);
      yearsExpenses = getYearsExpenses(totalByDate);
    }

    return {
      ...state,
      loadingExpenses: false,
      expenses: expenses,
      weeksExpenses: weeksExpenses,
      monthsExpenses: monthsExpenses, 
      yearsExpenses: yearsExpenses,
      weeksTotal: getTotal(weeksExpenses),
      monthsTotal: getTotal(monthsExpenses),
      yearsTotal: getTotal(yearsExpenses)
    }
  }),

  loadFailed: () => update((state: any) => {
    return {
      ...state,
      loadingExpenses: false,
      loadFailed: true
    }
  })
})
