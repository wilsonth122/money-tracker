import { Expense } from './types'
import { appState } from '../appState';
import { updateStateFromNewExpenses } from '../../utils/expenseStats';
import { loadExpenses, streamExpenses, stopStreamingExpenses } from './api';

export const actions = (update: any) => ({
  loadExpenses: () => update((state: any) => {
    loadExpenses(
      appState.actions(update).createExpenseList, 
      appState.actions(update).createFailed
    );

    return {
      ...state,
      loadingExpenses: true,
      loadFailed: false
    }
  }),

  streamExpenses: () => update((state: any) => {
    streamExpenses(
      appState.actions(update).updateExpenseList,
      appState.actions(update).updateFailed
    );

    return {
      ...state,
      loadingStream: true,
      streamingFailed: false
    }
  }),

  stopStreamingExpenses: () => update((state: any) => {
    stopStreamingExpenses();

    return {
      ...state
    }
  }),
  
  createExpenseList: (newExpenses: Expense[]) => update((state: any) => {
    let newState = updateStateFromNewExpenses(newExpenses, state);

    // Start streaming upon load
    appState.actions(update).streamExpenses();

    return {
      ...newState,
      loadingExpenses: false
    }
  }),

  createFailed: () => update((state: any) => {
    return {
      ...state,
      loadingExpenses: false,
      loadFailed: true
    }
  }),

  updateExpenseList: (data: any) => update((state: any) => {
    try {
      let expense: Expense = JSON.parse(data);
      let expenses: Expense[] = [...state.expenses];
      let index = expenses.findIndex(el => el.id === expense.id);

      if(index !== -1) {
        expenses[index] = expense;
      }
      else {
        expenses.push(expense);
      }

      let newState = updateStateFromNewExpenses(expenses, state);

      return {
        ...newState
      }
    } catch(e) {
      // Ignore any data that isn't an expense
      return {
        ...state,
        loadingStream: false
      }
    }
  }),

  updateFailed: (error: Error) => update((state: any) => {
    return {
      ...state,
      streamingFailed: true,
      loadingStream: false
    }
  }),
})
