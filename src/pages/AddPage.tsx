import React, { Component } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { IonContent, IonLoading, IonAlert } from '@ionic/react';
import { Expense } from '../state/expenses/types';
import ExpenseForm from '../components/add/ExpenseForm';
import ActionBar from '../components/add/ActionBar';
import { createExpense, updateExpense, deleteExpense } from '../state/expenses/api';

export default class AddPage extends Component<any, any> {
    constructor (props: any) {
        super(props)

        let expense: Expense = this.props.state.defaultExpense

        if(this.props.location.state) {
            expense = this.props.location.state.expense
        }
        
        this.state = {
            expense: expense ?  {...expense} : {...this.props.state.defaultExpense},
            updatingExpenses: false,
            updateFailed: false
        }
    }

    updateSuccessful = () => {
        this.setState({
            updatingExpenses: false
        });
        
        this.props.history.push('/')
    }

    updateFailed = (error: string) => {
        this.setState({
            updatingExpenses: false,
            updateFailed: true
        });
    }

    createExpense = () => {
        let expense: Expense = {...this.state.expense}
        expense.userID = this.props.state.user.email

        this.setState({
            expense: expense,
            updatingExpenses: true
        })
        
        createExpense(this.state.expense, this.updateSuccessful, this.updateFailed)
    }

    updateExpense = () => {
        this.setState({updatingExpenses: true})
        updateExpense(this.state.expense, this.updateSuccessful, this.updateFailed)
    }

    deleteExpense = () => {
        this.setState({updatingExpenses: true})
        deleteExpense(this.state.expense.id, this.updateSuccessful, this.updateFailed)
    }
    
    render() {
        return (
            <IonContent>
                <ExpenseForm expense={this.state.expense} />

                { this.state.expense.id ? (
                    <ActionBar save={this.updateExpense} delete={this.deleteExpense} />
                ) : (
                    <ActionBar save={this.createExpense} />
                )}

                <IonLoading
                    isOpen={this.state.updatingExpenses}
                    onDidDismiss={() => { this.setState({updatingExpenses: false}) }}
                    message={'Saving...'}
                    duration={500}
                />

                <IonAlert
                    isOpen={this.state.updateFailed}
                    onDidDismiss={() => { this.setState({updateFailed: false}) }}
                    header={'Failed to update expense'}
                    message={'Please check your internet connection.'}
                    backdropDismiss={false}
                    buttons={['Okay']}
                />
            </IonContent>
        )
    }
}