import { Expense, TotalByDate } from "../state/expenses/types";

export function calculateTotalByDate(expenses: Expense[]) {
    let totalByDate: TotalByDate[] = [];

    for(let expense of expenses) {
        let found = totalByDate.find((element) => {
            return element.date === expense.date;
        });
    
        if(found) {
            found.total += expense.isSaving ? expense.price : -expense.price;
        }
        else {
            totalByDate.push({
                date: expense.date, 
                total: expense.isSaving ? expense.price : -expense.price
            });
        } 
    }

    totalByDate.sort((t1: TotalByDate, t2: TotalByDate) => {
        const a = new Date(t1.date);
        const b = new Date(t2.date);

        return +a - +b;
    });

    return totalByDate;
}

export function getWeeksExpenses(totalByDate: TotalByDate[]) {
    let cutOffDate = new Date();

    cutOffDate.setHours(0,0,0,0);
    cutOffDate.setDate(cutOffDate.getDate() - 7);

    return totalByDate.filter(val => {
        let date = new Date(val.date);
        return date >= cutOffDate;
    });
}

export function getMonthsExpenses(totalByDate: TotalByDate[]) {
    let cutOffDate = new Date();
    
    cutOffDate.setHours(0,0,0,0);
    cutOffDate.setMonth(cutOffDate.getMonth() - 1);

    return totalByDate.filter(val => {
        let date = new Date(val.date);
        return date >= cutOffDate;
    });
}

export function getYearsExpenses(totalByDate: TotalByDate[]) {
    let cutOffDate = new Date();
    
    cutOffDate.setHours(0,0,0,0);
    cutOffDate.setMonth(cutOffDate.getMonth() - 12);

    return totalByDate.filter(val => {
        let date = new Date(val.date);
        return date >= cutOffDate;
    });
}

export function getTotal(totalByDate: TotalByDate[]) {
    let total = 0;

    totalByDate.forEach((element) => {
        total += element.total;
    })

    return total;
}