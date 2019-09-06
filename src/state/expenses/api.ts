import axios from 'axios';
import { Expense } from './types';
import { tokenHeader } from '../../storage/storageUtils';

const expensesUrl: string = process.env.REACT_APP_EXPENSES_URL || "";

export function loadExpenses(onSuccess: Function, onError: Function) {
    let header = tokenHeader();
    
    axios.get(expensesUrl, header)
        .then((response) => {
            if(response.status >= 200 && response.status <= 300) {
                onSuccess(response.data)
            } 
            else {
                onError(response.data)
            }
        })
        .catch((error) => onError(error))
}

export function createExpense(expense: Expense, onSuccess: Function, onError: Function) {
    let header = tokenHeader();
    
    axios.post(expensesUrl, JSON.stringify(expense), header)
        .then((response) => {
            if(response.status >= 200 && response.status <= 300) {
                onSuccess(response.data)
            } 
            else {
                onError(response.data)
            }
        })
        .catch((error) => onError(error))

}

export function updateExpense(expense: Expense, onSuccess: Function, onError: Function) {
    let header = tokenHeader();
    
    axios.put(expensesUrl, JSON.stringify(expense), header)
        .then((response) => {
            if(response.status >= 200 && response.status <= 300) {
                onSuccess(response.data)
            } 
            else {
                onError(response.data)
            }
        })
        .catch((error) => onError(error))

}

export function deleteExpense(id: String, onSuccess: Function, onError: Function) {
    let header = tokenHeader();
    
    axios.delete(expensesUrl + "/" + id, header)
        .then((response) => {
            if(response.status >= 200 && response.status <= 300) {
                onSuccess(response.data)
            } 
            else {
                onError(response.data)
            }
        })
        .catch((error) => onError(error))
}