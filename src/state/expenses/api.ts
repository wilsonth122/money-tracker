import axios from 'axios';
import { Expense } from './types';
import { tokenHeader, tokenAsJSON } from '../../utils/cookieUtils';

const expensesUrl: string = process.env.REACT_APP_EXPENSES_URL || "";
const websocketExpensesUrl: string = "ws://localhost:8080/api/stream/expenses";
let ws: WebSocket;

// streamExpenses uses websockets to get any expenses which are created or updated
export function streamExpenses(onUpdate: Function, onError: Function) {
    if(ws) { 
        stopStreamingExpenses()
    }
    
    ws = new WebSocket(websocketExpensesUrl);

    // Once connection is open, send auth token to authenticate user
    ws.onopen = (ev: Event) => { ws.send(JSON.stringify(tokenAsJSON())) }
    ws.onmessage = (ev: MessageEvent) => { onUpdate(ev.data) }
    ws.onerror = (ev: Event) => { onError(ev) }
    ws.onclose = (ev: CloseEvent) => { onError("Connection closed unexpectedly") }
}

export function stopStreamingExpenses() {
    ws.onopen = () => {}
    ws.onmessage = () => {}
    ws.onerror = () => {}
    ws.onclose = () => {}
    ws.close();
}

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